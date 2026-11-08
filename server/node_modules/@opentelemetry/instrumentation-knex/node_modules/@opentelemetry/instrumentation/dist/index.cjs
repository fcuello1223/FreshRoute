Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_autoLoader = require("./autoLoader.cjs");
const require_instrumentationNodeModuleDefinition = require("./instrumentationNodeModuleDefinition.cjs");
const require_utils = require("./utils.cjs");
const require_semconvStability = require("./semconvStability.cjs");
let _platform = require("#platform");
Object.defineProperty(exports, "InstrumentationBase", {
	enumerable: true,
	get: function() {
		return _platform.InstrumentationBase;
	}
});
exports.InstrumentationNodeModuleDefinition = require_instrumentationNodeModuleDefinition.InstrumentationNodeModuleDefinition;
Object.defineProperty(exports, "InstrumentationNodeModuleFile", {
	enumerable: true,
	get: function() {
		return _platform.InstrumentationNodeModuleFile;
	}
});
exports.SemconvStability = require_semconvStability.SemconvStability;
exports.isWrapped = require_utils.isWrapped;
exports.registerInstrumentations = require_autoLoader.registerInstrumentations;
exports.safeExecuteInTheMiddle = require_utils.safeExecuteInTheMiddle;
exports.safeExecuteInTheMiddleAsync = require_utils.safeExecuteInTheMiddleAsync;
exports.semconvStabilityFromStr = require_semconvStability.semconvStabilityFromStr;
