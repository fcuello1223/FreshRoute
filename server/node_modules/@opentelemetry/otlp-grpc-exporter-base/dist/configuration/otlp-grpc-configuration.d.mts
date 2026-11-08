import { OtlpSharedConfiguration } from "@opentelemetry/otlp-exporter-base";
import { ChannelCredentials, Metadata } from "@grpc/grpc-js";
//#region src/configuration/otlp-grpc-configuration.d.ts
interface OtlpGrpcConfiguration extends OtlpSharedConfiguration {
  url: string;
  metadata: () => Metadata;
  credentials: () => ChannelCredentials;
  userAgent?: string;
}
//#endregion
export { OtlpGrpcConfiguration };
//# sourceMappingURL=otlp-grpc-configuration.d.mts.map