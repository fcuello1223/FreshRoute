const require_autoLoaderUtils = require("./autoLoaderUtils.cjs");
let _opentelemetry_api = require("@opentelemetry/api");
//#region src/autoLoader.ts
/**
* It will register instrumentations and plugins
* @param options
* @return returns function to unload instrumentation and plugins that were
*   registered
*/
function registerInstrumentations(options) {
	const tracerProvider = options.tracerProvider || _opentelemetry_api.trace.getTracerProvider();
	const meterProvider = options.meterProvider || _opentelemetry_api.metrics.getMeterProvider();
	const loggerProvider = options.loggerProvider || _opentelemetry_api.logs.getLoggerProvider();
	const instrumentations = options.instrumentations?.flat() ?? [];
	require_autoLoaderUtils.enableInstrumentations(instrumentations, tracerProvider, meterProvider, loggerProvider);
	return () => {
		require_autoLoaderUtils.disableInstrumentations(instrumentations);
	};
}
//#endregion
exports.registerInstrumentations = registerInstrumentations;

//# sourceMappingURL=autoLoader.cjs.map