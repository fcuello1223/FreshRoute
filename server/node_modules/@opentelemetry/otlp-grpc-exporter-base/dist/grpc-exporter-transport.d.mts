/// <reference types="node" />
import "@opentelemetry/otlp-exporter-base";
import { ChannelCredentials, Metadata } from "@grpc/grpc-js";
//#region src/grpc-exporter-transport.d.ts
declare function createInsecureCredentials(): ChannelCredentials;
declare function createSslCredentials(rootCert?: Buffer, privateKey?: Buffer, certChain?: Buffer): ChannelCredentials;
declare function createEmptyMetadata(): Metadata;
//#endregion
export { createEmptyMetadata, createInsecureCredentials, createSslCredentials };
//# sourceMappingURL=grpc-exporter-transport.d.mts.map