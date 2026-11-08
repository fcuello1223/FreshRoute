import { OtlpGrpcConfiguration } from "./configuration/otlp-grpc-configuration.cjs";
import { ExporterMetrics, IOtlpExportDelegate } from "@opentelemetry/otlp-exporter-base";
import { MeterProvider } from "@opentelemetry/api";
import { IExporterMetricsHelper, ISerializer } from "@opentelemetry/otlp-transformer";
//#region src/otlp-grpc-export-delegate.d.ts
declare function createOtlpGrpcExporterMetrics<Internal>(metricsComponentType: string, exporterMetricsHelper: IExporterMetricsHelper<Internal>, url: string | undefined, meterProvider: MeterProvider | undefined): ExporterMetrics<Internal>;
declare function createOtlpGrpcExportDelegate<Internal, Response>(options: OtlpGrpcConfiguration, serializer: ISerializer<Internal, Response>, metricsComponentType: string, exporterMetricsHelper: IExporterMetricsHelper<Internal>, meterProvider: MeterProvider | undefined, grpcName: string, grpcPath: string): IOtlpExportDelegate<Internal>;
//#endregion
export { createOtlpGrpcExportDelegate, createOtlpGrpcExporterMetrics };
//# sourceMappingURL=otlp-grpc-export-delegate.d.cts.map