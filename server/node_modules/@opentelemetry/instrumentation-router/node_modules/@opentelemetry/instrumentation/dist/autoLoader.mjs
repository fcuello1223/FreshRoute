import { disableInstrumentations, enableInstrumentations } from "./autoLoaderUtils.mjs";
import { logs, metrics, trace } from "@opentelemetry/api";
//#region src/autoLoader.ts
/**
* It will register instrumentations and plugins
* @param options
* @return returns function to unload instrumentation and plugins that were
*   registered
*/
function registerInstrumentations(options) {
	const tracerProvider = options.tracerProvider || trace.getTracerProvider();
	const meterProvider = options.meterProvider || metrics.getMeterProvider();
	const loggerProvider = options.loggerProvider || logs.getLoggerProvider();
	const instrumentations = options.instrumentations?.flat() ?? [];
	enableInstrumentations(instrumentations, tracerProvider, meterProvider, loggerProvider);
	return () => {
		disableInstrumentations(instrumentations);
	};
}
//#endregion
export { registerInstrumentations };

//# sourceMappingURL=autoLoader.mjs.map