/// <reference types="node" />
import { ChannelCredentials, Metadata } from "@grpc/grpc-js";
import "@opentelemetry/otlp-exporter-base";
//#region src/grpc-exporter-transport.d.ts
declare function createInsecureCredentials(): ChannelCredentials;
declare function createSslCredentials(rootCert?: Buffer, privateKey?: Buffer, certChain?: Buffer): ChannelCredentials;
declare function createEmptyMetadata(): Metadata;
//#endregion
export { createEmptyMetadata, createInsecureCredentials, createSslCredentials };
//# sourceMappingURL=grpc-exporter-transport.d.cts.map