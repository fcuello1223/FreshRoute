//#region src/autoLoaderUtils.ts
/**
* Enable instrumentations
* @param instrumentations
* @param tracerProvider
* @param meterProvider
*/
function enableInstrumentations(instrumentations, tracerProvider, meterProvider, loggerProvider) {
	for (let i = 0, j = instrumentations.length; i < j; i++) {
		const instrumentation = instrumentations[i];
		if (tracerProvider) instrumentation.setTracerProvider(tracerProvider);
		if (meterProvider) instrumentation.setMeterProvider(meterProvider);
		if (loggerProvider && instrumentation.setLoggerProvider) instrumentation.setLoggerProvider(loggerProvider);
		if (!instrumentation.getConfig().enabled) instrumentation.enable();
	}
}
/**
* Disable instrumentations
* @param instrumentations
*/
function disableInstrumentations(instrumentations) {
	instrumentations.forEach((instrumentation) => instrumentation.disable());
}
//#endregion
exports.disableInstrumentations = disableInstrumentations;
exports.enableInstrumentations = enableInstrumentations;

//# sourceMappingURL=autoLoaderUtils.cjs.map