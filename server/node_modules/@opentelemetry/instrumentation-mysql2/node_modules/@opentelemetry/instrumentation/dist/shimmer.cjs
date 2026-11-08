//#region src/shimmer.ts
let logger = console.error.bind(console);
function defineProperty(obj, name, value) {
	const enumerable = !!obj[name] && Object.prototype.propertyIsEnumerable.call(obj, name);
	Object.defineProperty(obj, name, {
		configurable: true,
		enumerable,
		writable: true,
		value
	});
}
const wrap = (nodule, name, wrapper) => {
	if (!nodule || !nodule[name]) {
		logger("no original function " + String(name) + " to wrap");
		return;
	}
	if (!wrapper) {
		logger("no wrapper function");
		logger((/* @__PURE__ */ new Error()).stack);
		return;
	}
	const original = nodule[name];
	if (typeof original !== "function" || typeof wrapper !== "function") {
		logger("original object and wrapper must be functions");
		return;
	}
	const wrapped = wrapper(original, name);
	defineProperty(wrapped, "__original", original);
	defineProperty(wrapped, "__unwrap", () => {
		if (nodule[name] === wrapped) defineProperty(nodule, name, original);
	});
	defineProperty(wrapped, "__wrapped", true);
	defineProperty(nodule, name, wrapped);
	return wrapped;
};
const massWrap = (nodules, names, wrapper) => {
	if (!nodules) {
		logger("must provide one or more modules to patch");
		logger((/* @__PURE__ */ new Error()).stack);
		return;
	} else if (!Array.isArray(nodules)) nodules = [nodules];
	if (!(names && Array.isArray(names))) {
		logger("must provide one or more functions to wrap on modules");
		return;
	}
	nodules.forEach((nodule) => {
		names.forEach((name) => {
			wrap(nodule, name, wrapper);
		});
	});
};
const unwrap = (nodule, name) => {
	if (!nodule || !nodule[name]) {
		logger("no function to unwrap.");
		logger((/* @__PURE__ */ new Error()).stack);
		return;
	}
	const wrapped = nodule[name];
	if (!wrapped.__unwrap) logger("no original to unwrap to -- has " + String(name) + " already been unwrapped?");
	else {
		wrapped.__unwrap();
		return;
	}
};
const massUnwrap = (nodules, names) => {
	if (!nodules) {
		logger("must provide one or more modules to patch");
		logger((/* @__PURE__ */ new Error()).stack);
		return;
	} else if (!Array.isArray(nodules)) nodules = [nodules];
	if (!(names && Array.isArray(names))) {
		logger("must provide one or more functions to unwrap on modules");
		return;
	}
	nodules.forEach((nodule) => {
		names.forEach((name) => {
			unwrap(nodule, name);
		});
	});
};
function shimmer(options) {
	if (options && options.logger) {
		if (typeof options.logger !== "function") logger("new logger isn't a function, not replacing");
		else logger = options.logger;
	}
}
shimmer.wrap = wrap;
shimmer.massWrap = massWrap;
shimmer.unwrap = unwrap;
shimmer.massUnwrap = massUnwrap;
//#endregion
exports.default = shimmer;
exports.massUnwrap = massUnwrap;
exports.massWrap = massWrap;
exports.unwrap = unwrap;
exports.wrap = wrap;

//# sourceMappingURL=shimmer.cjs.map