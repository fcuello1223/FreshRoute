import { OTLPGRPCExporterConfigNode } from "../types.mjs";
import { OtlpGrpcConfiguration } from "./otlp-grpc-configuration.mjs";
//#region src/configuration/convert-legacy-otlp-grpc-options.d.ts
/**
 * @deprecated
 * @param config
 * @param signalIdentifier
 */
declare function convertLegacyOtlpGrpcOptions(config: OTLPGRPCExporterConfigNode, signalIdentifier: string): OtlpGrpcConfiguration;
//#endregion
export { convertLegacyOtlpGrpcOptions };
//# sourceMappingURL=convert-legacy-otlp-grpc-options.d.mts.map