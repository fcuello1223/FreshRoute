const require_runtime = require("../../_virtual/_rolldown/runtime.cjs");
const require_utils = require("../../utils.cjs");
const require_semver = require("../../semver.cjs");
const require_shimmer = require("../../shimmer.cjs");
const require_instrumentation = require("../../instrumentation.cjs");
const require_RequireInTheMiddleSingleton = require("./RequireInTheMiddleSingleton.cjs");
let _opentelemetry_api = require("@opentelemetry/api");
let path = require("path");
path = require_runtime.__toESM(path);
let util = require("util");
let require_in_the_middle = require("require-in-the-middle");
let import_in_the_middle = require("import-in-the-middle");
let fs = require("fs");
//#region src/platform/node/instrumentation.ts
/**
* Base abstract class for instrumenting node plugins
*/
var InstrumentationBase = class extends require_instrumentation.InstrumentationAbstract {
	_modules;
	_hooks = [];
	_requireInTheMiddleSingleton = require_RequireInTheMiddleSingleton.RequireInTheMiddleSingleton.getInstance();
	/** Set by the base enable() and disable(); subclasses only read it. */
	_enabled = false;
	constructor(instrumentationName, instrumentationVersion, config) {
		super(instrumentationName, instrumentationVersion, config);
		let modules = this.init();
		if (modules && !Array.isArray(modules)) modules = [modules];
		this._modules = modules || [];
		if (this._config.enabled) this.enable();
	}
	_wrap = (moduleExports, name, wrapper) => {
		if (require_utils.isWrapped(moduleExports[name])) this._unwrap(moduleExports, name);
		if (!util.types.isProxy(moduleExports)) return require_shimmer.wrap(moduleExports, name, wrapper);
		else {
			const wrapped = require_shimmer.wrap(Object.assign({}, moduleExports), name, wrapper);
			Object.defineProperty(moduleExports, name, { value: wrapped });
			return wrapped;
		}
	};
	_unwrap = (moduleExports, name) => {
		if (!util.types.isProxy(moduleExports)) return require_shimmer.unwrap(moduleExports, name);
		else return Object.defineProperty(moduleExports, name, { value: moduleExports[name] });
	};
	_massWrap = (moduleExportsArray, names, wrapper) => {
		if (!moduleExportsArray) {
			_opentelemetry_api.diag.error("must provide one or more modules to patch");
			return;
		} else if (!Array.isArray(moduleExportsArray)) moduleExportsArray = [moduleExportsArray];
		if (!(names && Array.isArray(names))) {
			_opentelemetry_api.diag.error("must provide one or more functions to wrap on modules");
			return;
		}
		moduleExportsArray.forEach((moduleExports) => {
			names.forEach((name) => {
				this._wrap(moduleExports, name, wrapper);
			});
		});
	};
	_massUnwrap = (moduleExportsArray, names) => {
		if (!moduleExportsArray) {
			_opentelemetry_api.diag.error("must provide one or more modules to patch");
			return;
		} else if (!Array.isArray(moduleExportsArray)) moduleExportsArray = [moduleExportsArray];
		if (!(names && Array.isArray(names))) {
			_opentelemetry_api.diag.error("must provide one or more functions to wrap on modules");
			return;
		}
		moduleExportsArray.forEach((moduleExports) => {
			names.forEach((name) => {
				this._unwrap(moduleExports, name);
			});
		});
	};
	_warnOnPreloadedModules() {
		const nodeRequire = globalThis.require;
		if (!nodeRequire?.resolve || !nodeRequire?.cache) return;
		this._modules.forEach((module) => {
			const { name } = module;
			try {
				const resolvedModule = nodeRequire.resolve(name);
				if (nodeRequire.cache[resolvedModule]?.loaded) this._diag.warn(`Module ${name} has been loaded before ${this.instrumentationName} so it might not work, please initialize it before requiring ${name}`);
			} catch {}
		});
	}
	_extractPackageVersion(baseDir) {
		try {
			const json = (0, fs.readFileSync)(path.join(baseDir, "package.json"), { encoding: "utf8" });
			const version = JSON.parse(json).version;
			return typeof version === "string" ? version : void 0;
		} catch {
			_opentelemetry_api.diag.warn("Failed extracting version", baseDir);
		}
	}
	_onRequire(module, exports, name, baseDir) {
		if (!baseDir) {
			if (typeof module.patch === "function") {
				module.moduleExports = exports;
				if (this._enabled) {
					this._diag.debug("Applying instrumentation patch for nodejs core module on require hook", { module: module.name });
					return module.patch(exports);
				}
			}
			return exports;
		}
		const version = this._extractPackageVersion(baseDir);
		module.moduleVersion = version;
		if (module.name === name) {
			if (isSupported(module.supportedVersions, version, module.includePrerelease)) {
				if (typeof module.patch === "function") {
					module.moduleExports = exports;
					if (this._enabled) {
						this._diag.debug("Applying instrumentation patch for module on require hook", {
							module: module.name,
							version: module.moduleVersion,
							baseDir
						});
						return module.patch(exports, module.moduleVersion);
					}
				}
			}
			return exports;
		}
		const files = module.files ?? [];
		const normalizedName = path.normalize(name);
		return files.filter((f) => f.name === normalizedName && isSupported(f.supportedVersions, version, module.includePrerelease)).reduce((patchedExports, file) => {
			file.moduleExports = patchedExports;
			if (this._enabled) {
				this._diag.debug("Applying instrumentation patch for nodejs module file on require hook", {
					module: module.name,
					version: module.moduleVersion,
					fileName: file.name,
					baseDir
				});
				return file.patch(patchedExports, module.moduleVersion);
			}
			return patchedExports;
		}, exports);
	}
	enable() {
		if (this._enabled) return;
		this._enabled = true;
		if (this._hooks.length > 0) {
			for (const module of this._modules) {
				if (typeof module.patch === "function" && module.moduleExports) {
					this._diag.debug("Applying instrumentation patch for nodejs module on instrumentation enabled", {
						module: module.name,
						version: module.moduleVersion
					});
					module.patch(module.moduleExports, module.moduleVersion);
				}
				for (const file of module.files) if (file.moduleExports) {
					this._diag.debug("Applying instrumentation patch for nodejs module file on instrumentation enabled", {
						module: module.name,
						version: module.moduleVersion,
						fileName: file.name
					});
					file.patch(file.moduleExports, module.moduleVersion);
				}
			}
			return;
		}
		this._warnOnPreloadedModules();
		for (const module of this._modules) {
			const hookFn = (exports, name, baseDir) => {
				if (!baseDir && path.isAbsolute(name)) {
					const parsedPath = path.parse(name);
					name = parsedPath.name;
					baseDir = parsedPath.dir;
				}
				return this._onRequire(module, exports, name, baseDir);
			};
			const onRequire = (exports, name, baseDir) => {
				return this._onRequire(module, exports, name, baseDir);
			};
			const hook = path.isAbsolute(module.name) ? new require_in_the_middle.Hook([module.name], { internals: true }, onRequire) : this._requireInTheMiddleSingleton.register(module.name, onRequire);
			this._hooks.push(hook);
			const esmHook = new import_in_the_middle.Hook([module.name], { internals: true }, hookFn);
			this._hooks.push(esmHook);
		}
	}
	disable() {
		if (!this._enabled) return;
		this._enabled = false;
		for (const module of this._modules) {
			if (typeof module.unpatch === "function" && module.moduleExports) {
				this._diag.debug("Removing instrumentation patch for nodejs module on instrumentation disabled", {
					module: module.name,
					version: module.moduleVersion
				});
				module.unpatch(module.moduleExports, module.moduleVersion);
			}
			for (const file of module.files) if (file.moduleExports) {
				this._diag.debug("Removing instrumentation patch for nodejs module file on instrumentation disabled", {
					module: module.name,
					version: module.moduleVersion,
					fileName: file.name
				});
				file.unpatch(file.moduleExports, module.moduleVersion);
			}
		}
	}
	isEnabled() {
		return this._enabled;
	}
};
function isSupported(supportedVersions, version, includePrerelease) {
	if (typeof version === "undefined") return supportedVersions.includes("*");
	return supportedVersions.some((supportedVersion) => {
		return require_semver.satisfies(version, supportedVersion, { includePrerelease });
	});
}
//#endregion
exports.InstrumentationBase = InstrumentationBase;

//# sourceMappingURL=instrumentation.cjs.map