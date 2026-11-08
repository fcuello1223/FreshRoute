const require_shimmer = require("./shimmer.cjs");
let _opentelemetry_api = require("@opentelemetry/api");
//#region src/instrumentation.ts
/**
* Base abstract internal class for instrumenting node and web plugins
*/
var InstrumentationAbstract = class {
	_config = {};
	_tracer;
	_meter;
	_logger;
	_diag;
	instrumentationName;
	instrumentationVersion;
	constructor(instrumentationName, instrumentationVersion, config) {
		this.instrumentationName = instrumentationName;
		this.instrumentationVersion = instrumentationVersion;
		this.setConfig(config);
		this._diag = _opentelemetry_api.diag.createComponentLogger({ namespace: instrumentationName });
		this._tracer = _opentelemetry_api.trace.getTracer(instrumentationName, instrumentationVersion);
		this._meter = _opentelemetry_api.metrics.getMeter(instrumentationName, instrumentationVersion);
		this._logger = _opentelemetry_api.logs.getLogger(instrumentationName, instrumentationVersion);
		this._updateMetricInstruments();
	}
	_wrap = require_shimmer.wrap;
	_unwrap = require_shimmer.unwrap;
	_massWrap = require_shimmer.massWrap;
	_massUnwrap = require_shimmer.massUnwrap;
	get meter() {
		return this._meter;
	}
	/**
	* Sets MeterProvider to this plugin
	* @param meterProvider
	*/
	setMeterProvider(meterProvider) {
		this._meter = meterProvider.getMeter(this.instrumentationName, this.instrumentationVersion);
		this._updateMetricInstruments();
	}
	get logger() {
		return this._logger;
	}
	/**
	* Sets LoggerProvider to this plugin
	* @param loggerProvider
	*/
	setLoggerProvider(loggerProvider) {
		this._logger = loggerProvider.getLogger(this.instrumentationName, this.instrumentationVersion);
	}
	/**
	* @experimental
	*
	* Get module definitions defined by {@link init}.
	* This can be used for experimental compile-time instrumentation.
	*
	* @returns an array of {@link InstrumentationModuleDefinition}
	*/
	getModuleDefinitions() {
		const initResult = this.init() ?? [];
		if (!Array.isArray(initResult)) return [initResult];
		return initResult;
	}
	/**
	* Sets the new metric instruments with the current Meter.
	*/
	_updateMetricInstruments() {}
	getConfig() {
		return this._config;
	}
	/**
	* Sets InstrumentationConfig to this plugin
	* @param config
	*/
	setConfig(config) {
		this._config = {
			enabled: true,
			...config
		};
	}
	/**
	* Sets TracerProvider to this plugin
	* @param tracerProvider
	*/
	setTracerProvider(tracerProvider) {
		this._tracer = tracerProvider.getTracer(this.instrumentationName, this.instrumentationVersion);
	}
	get tracer() {
		return this._tracer;
	}
	/**
	* Execute span customization hook, if configured, and log any errors.
	* Any semantics of the trigger and info are defined by the specific instrumentation.
	* @param hookHandler The optional hook handler which the user has configured via instrumentation config
	* @param triggerName The name of the trigger for executing the hook for logging purposes
	* @param span The span to which the hook should be applied
	* @param info The info object to be passed to the hook, with useful data the hook may use
	*/
	_runSpanCustomizationHook(hookHandler, triggerName, span, info) {
		if (!hookHandler) return;
		try {
			hookHandler(span, info);
		} catch (e) {
			this._diag.error("Error running span customization hook due to exception in handler", { triggerName }, e);
		}
	}
};
//#endregion
exports.InstrumentationAbstract = InstrumentationAbstract;

//# sourceMappingURL=instrumentation.cjs.map