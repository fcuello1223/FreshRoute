require("./_virtual/_rolldown/runtime.cjs");
const require_grpc_exporter_transport = require("./grpc-exporter-transport.cjs");
const require_semconv = require("./semconv.cjs");
let _opentelemetry_otlp_exporter_base = require("@opentelemetry/otlp-exporter-base");
//#region src/otlp-grpc-export-delegate.ts
function createOtlpGrpcExporterMetrics(metricsComponentType, exporterMetricsHelper, url, meterProvider) {
	return new _opentelemetry_otlp_exporter_base.ExporterMetrics({
		componentType: metricsComponentType,
		metricsHelper: exporterMetricsHelper,
		url,
		meterProvider,
		responseAttributesFromError: (error) => {
			if (!error) return { [require_semconv.ATTR_RPC_RESPONSE_STATUS_CODE]: "OK" };
			if (!isServiceError(error)) return {};
			const { status } = require("@grpc/grpc-js");
			const statusName = status[error.code] ?? "UNKNOWN";
			return { [require_semconv.ATTR_RPC_RESPONSE_STATUS_CODE]: statusName };
		}
	});
}
function createOtlpGrpcExportDelegate(options, serializer, metricsComponentType, exporterMetricsHelper, meterProvider, grpcName, grpcPath) {
	return (0, _opentelemetry_otlp_exporter_base.createOtlpNetworkExportDelegate)(options, serializer, createOtlpGrpcExporterMetrics(metricsComponentType, exporterMetricsHelper, options.url, meterProvider), require_grpc_exporter_transport.createOtlpGrpcExporterTransport({
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
exports.createOtlpGrpcExportDelegate = createOtlpGrpcExportDelegate;
exports.createOtlpGrpcExporterMetrics = createOtlpGrpcExporterMetrics;

//# sourceMappingURL=otlp-grpc-export-delegate.cjs.map