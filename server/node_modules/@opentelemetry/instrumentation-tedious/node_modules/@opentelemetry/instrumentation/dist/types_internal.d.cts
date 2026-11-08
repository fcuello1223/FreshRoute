import { Instrumentation } from "./types.cjs";
import { LoggerProvider, MeterProvider, TracerProvider } from "@opentelemetry/api";
//#region src/types_internal.d.ts
interface AutoLoaderResult {
  instrumentations: Instrumentation[];
}
interface AutoLoaderOptions {
  instrumentations?: (Instrumentation | Instrumentation[])[];
  tracerProvider?: TracerProvider;
  meterProvider?: MeterProvider;
  loggerProvider?: LoggerProvider;
}
//#endregion
export { AutoLoaderOptions, AutoLoaderResult };
//# sourceMappingURL=types_internal.d.cts.map