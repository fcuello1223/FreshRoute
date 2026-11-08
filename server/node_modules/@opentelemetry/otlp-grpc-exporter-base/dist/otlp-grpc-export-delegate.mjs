import { __require } from "./_virtual/_rolldown/runtime.mjs";
import { createOtlpGrpcExporterTransport } from "./grpc-exporter-transport.mjs";
import { ATTR_RPC_RESPONSE_STATUS_CODE } from "./semconv.mjs";
import { ExporterMetrics, createOtlpNetworkExportDelegate } from "@opentelemetry/otlp-exporter-base";
//#region src/otlp-grpc-export-delegate.ts
function createOtlpGrpcExporterMetrics(metricsComponentType, exporterMetricsHelper, url, meterProvider) {
	return new ExporterMetrics({
		componentType: metricsComponentType,
		metricsHelper: exporterMetricsHelper,
		url,
		meterProvider,
		responseAttributesFromError: (error) => {
			if (!error) return { [ATTR_RPC_RESPONSE_STATUS_CODE]: "OK" };
			if (!isServiceError(error)) return {};
			const { status } = __require("@grpc/grpc-js");
			const statusName = status[error.code] ?? "UNKNOWN";
			return { [ATTR_RPC_RESPONSE_STATUS_CODE]: statusName };
		}
	});
}
function createOtlpGrpcExportDelegate(options, serializer, metricsComponentType, exporterMetricsHelper, meterProvider, grpcName, grpcPath) {
	return createOtlpNetworkExportDelegate(options, serializer, createOtlpGrpcExporterMetrics(metricsComponentType, exporterMetricsHelper, options.url, meterProvider), createOtlpGrpcExporterTransport({
		address: options.url,
		compression: options.compression,
		credentials: options.credentials,
		metadata: options.metadata,
		userAgent: options.userAgent,
		grpcName,
		grpcPath
	}));
}
function isServiceError(error) {
	return typeof error === "object" && error !== null && "code" in error && typeof error.code === "number";
}
//#endregion
export { createOtlpGrpcExportDelegate, createOtlpGrpcExporterMetrics };

//# sourceMappingURL=otlp-grpc-export-delegate.mjs.map