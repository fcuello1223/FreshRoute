import { OTLPGRPCExporterConfigNode } from "../types.cjs";
import { OtlpGrpcConfiguration } from "./otlp-grpc-configuration.cjs";
//#region src/configuration/convert-legacy-otlp-grpc-options.d.ts
/**
 * @deprecated
 * @param config
 * @param signalIdentifier
 */
declare function convertLegacyOtlpGrpcOptions(config: OTLPGRPCExporterConfigNode, signalIdentifier: string): OtlpGrpcConfiguration;
//#endregion
export { convertLegacyOtlpGrpcOptions };
//# sourceMappingURL=convert-legacy-otlp-grpc-options.d.cts.map