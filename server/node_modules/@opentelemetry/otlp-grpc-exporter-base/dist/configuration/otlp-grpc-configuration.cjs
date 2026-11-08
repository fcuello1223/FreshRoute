require("../_virtual/_rolldown/runtime.cjs");
const require_grpc_exporter_transport = require("../grpc-exporter-transport.cjs");
let _opentelemetry_otlp_exporter_base = require("@opentelemetry/otlp-exporter-base");
let url = require("url");
let _opentelemetry_api = require("@opentelemetry/api");
//#region src/configuration/otlp-grpc-configuration.ts
function validateAndNormalizeUrl(url$1) {
	url$1 = url$1.trim();
	if (!url$1.match(/^([\w]{1,8}):\/\//)) url$1 = `https://${url$1}`;
	const target = new url.URL(url$1);
	if (target.protocol === "unix:") return url$1;
	if (target.pathname && target.pathname !== "/") _opentelemetry_api.diag.warn("URL path should not be set when using grpc, the path part of the URL will be ignored.");
	if (target.protocol !== "" && !target.protocol?.match(/^(http)s?:$/)) _opentelemetry_api.diag.warn("URL protocol should be http(s)://. Using http://.");
	return target.host;
}
function overrideMetadataEntriesIfNotPresent(metadata, additionalMetadata) {
	for (const [key, value] of Object.entries(additionalMetadata.getMap())) if (metadata.get(key).length < 1) metadata.set(key, value);
}
function mergeOtlpGrpcConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration) {
	const rawUrl = userProvidedConfiguration.url ?? fallbackConfiguration.url ?? defaultConfiguration.url;
	return {
		...(0, _opentelemetry_otlp_exporter_base.mergeOtlpSharedConfigurationWithDefaults)(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration),
		metadata: () => {
			const metadata = defaultConfiguration.metadata();
			overrideMetadataEntriesIfNotPresent(metadata, userProvidedConfiguration.metadata?.().clone() ?? require_grpc_exporter_transport.createEmptyMetadata());
			overrideMetadataEntriesIfNotPresent(metadata, fallbackConfiguration.metadata?.() ?? require_grpc_exporter_transport.createEmptyMetadata());
			return metadata;
		},
		url: validateAndNormalizeUrl(rawUrl),
		credentials: userProvidedConfiguration.credentials ?? fallbackConfiguration.credentials?.(rawUrl) ?? defaultConfiguration.credentials(rawUrl),
		userAgent: userProvidedConfiguration.userAgent
	};
}
function getOtlpGrpcDefaultConfiguration() {
	return {
		...(0, _opentelemetry_otlp_exporter_base.getSharedConfigurationDefaults)(),
		metadata: () => require_grpc_exporter_transport.createEmptyMetadata(),
		url: "http://localhost:4317",
		credentials: (url$2) => {
			if (url$2.startsWith("http://")) return () => require_grpc_exporter_transport.createInsecureCredentials();
			else return () => require_grpc_exporter_transport.createSslCredentials();
		}
	};
}
//#endregion
exports.getOtlpGrpcDefaultConfiguration = getOtlpGrpcDefaultConfiguration;
exports.mergeOtlpGrpcConfigurationWithDefaults = mergeOtlpGrpcConfigurationWithDefaults;
exports.validateAndNormalizeUrl = validateAndNormalizeUrl;

//# sourceMappingURL=otlp-grpc-configuration.cjs.map