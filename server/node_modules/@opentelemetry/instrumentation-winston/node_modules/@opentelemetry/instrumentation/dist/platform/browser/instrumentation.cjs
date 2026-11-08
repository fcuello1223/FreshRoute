const require_instrumentation = require("../../instrumentation.cjs");
//#region src/platform/browser/instrumentation.ts
/**
* Base abstract class for instrumenting web plugins
*/
var InstrumentationBase = class extends require_instrumentation.InstrumentationAbstract {
	/** Subclasses set this to true when their enable() succeeds and to false in
	* their disable(); isEnabled() returns it. */
	_enabled = false;
	constructor(instrumentationName, instrumentationVersion, config) {
		super(instrumentationName, instrumentationVersion, config);
		if (this._config.enabled) this.enable();
	}
	/** Returns `_enabled`, which stays false unless the subclass's enable() sets it. */
	isEnabled() {
		return this._enabled;
	}
};
//#endregion
exports.InstrumentationBase = InstrumentationBase;

//# sourceMappingURL=instrumentation.cjs.map