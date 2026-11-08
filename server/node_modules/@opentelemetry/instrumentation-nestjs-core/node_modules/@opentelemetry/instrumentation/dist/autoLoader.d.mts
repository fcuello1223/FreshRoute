import { AutoLoaderOptions } from "./types_internal.mjs";
//#region src/autoLoader.d.ts
/**
 * It will register instrumentations and plugins
 * @param options
 * @return returns function to unload instrumentation and plugins that were
 *   registered
 */
declare function registerInstrumentations(options: AutoLoaderOptions): () => void;
//#endregion
export { registerInstrumentations };
//# sourceMappingURL=autoLoader.d.mts.map