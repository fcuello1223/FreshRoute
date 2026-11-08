import { ChannelCredentials, Metadata } from "@grpc/grpc-js";
import { CompressionAlgorithm, OTLPExporterConfigBase } from "@opentelemetry/otlp-exporter-base";
//#region src/types.d.ts
/**
 * OTLP Exporter Config for Node
 */
interface OTLPGRPCExporterConfigNode extends Omit<OTLPExporterConfigBase, 'headers'> {
  credentials?: ChannelCredentials;
  metadata?: Metadata;
  compression?: CompressionAlgorithm;
  userAgent?: string;
}
//#endregion
export { OTLPGRPCExporterConfigNode };
//# sourceMappingURL=types.d.cts.map