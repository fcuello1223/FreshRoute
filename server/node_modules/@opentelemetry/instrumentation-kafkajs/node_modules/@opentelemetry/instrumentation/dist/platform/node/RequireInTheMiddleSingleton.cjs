const require_runtime = require("../../_virtual/_rolldown/runtime.cjs");
const require_ModuleNameTrie = require("./ModuleNameTrie.cjs");
let path = require("path");
path = require_runtime.__toESM(path);
let require_in_the_middle = require("require-in-the-middle");
//#region src/platform/node/RequireInTheMiddleSingleton.ts
/**
* Whether Mocha is running in this process
* Inspired by https://github.com/AndreasPizsa/detect-mocha
*
* @type {boolean}
*/
const isMocha = [
	"afterEach",
	"after",
	"beforeEach",
	"before",
	"describe",
	"it"
].every((fn) => {
	return typeof global[fn] === "function";
});
/**
* Singleton class for `require-in-the-middle`
* Allows instrumentation plugins to patch modules with only a single `require` patch
* WARNING: Because this class will create its own `require-in-the-middle` (RITM) instance,
* we should minimize the number of new instances of this class.
* Multiple instances of `@opentelemetry/instrumentation` (e.g. multiple versions) in a single process
* will result in multiple instances of RITM, which will have an impact
* on the performance of instrumentation hooks being applied.
*/
var RequireInTheMiddleSingleton = class RequireInTheMiddleSingleton {
	_moduleNameTrie = new require_ModuleNameTrie.ModuleNameTrie();
	static _instance;
	constructor() {
		this._initialize();
	}
	_initialize() {
		new require_in_the_middle.Hook(null, { internals: true }, (exports, name, basedir) => {
			const normalizedModuleName = normalizePathSeparators(name);
			const matches = this._moduleNameTrie.search(normalizedModuleName, {
				maintainInsertionOrder: true,
				fullOnly: basedir === void 0
			});
			for (const { onRequire } of matches) exports = onRequire(exports, name, basedir);
			return exports;
		});
	}
	/**
	* Register a hook with `require-in-the-middle`
	*
	* @param {string} moduleName Module name
	* @param {OnRequireFn} onRequire Hook function
	* @returns {Hooked} Registered hook
	*/
	register(moduleName, onRequire) {
		const hooked = {
			moduleName,
			onRequire
		};
		this._moduleNameTrie.insert(hooked);
		return hooked;
	}
	/**
	* Get the `RequireInTheMiddleSingleton` singleton
	*
	* @returns {RequireInTheMiddleSingleton} Singleton of `RequireInTheMiddleSingleton`
	*/
	static getInstance() {
		if (isMocha) return new RequireInTheMiddleSingleton();
		return this._instance = this._instance ?? new RequireInTheMiddleSingleton();
	}
};
/**
* Normalize the path separators to forward slash in a module name or path
*
* @param {string} moduleNameOrPath Module name or path
* @returns {string} Normalized module name or path
*/
function normalizePathSeparators(moduleNameOrPath) {
	return path.sep !== "/" ? moduleNameOrPath.split(path.sep).join("/") : moduleNameOrPath;
}
//#endregion
exports.RequireInTheMiddleSingleton = RequireInTheMiddleSingleton;

//# sourceMappingURL=RequireInTheMiddleSingleton.cjs.map