import { createEmptyMetadata, createInsecureCredentials, createSslCredentials } from "../grpc-exporter-transport.mjs";
import { getSharedConfigurationDefaults, mergeOtlpSharedConfigurationWithDefaults } from "@opentelemetry/otlp-exporter-base";
import { URL } from "url";
import { diag } from "@opentelemetry/api";
//#region src/configuration/otlp-grpc-configuration.ts
function validateAndNormalizeUrl(url) {
	url = url.trim();
	if (!url.match(/^([\w]{1,8}):\/\//)) url = `https://${url}`;
	const target = new URL(url);
	if (target.protocol === "unix:") return url;
	if (target.pathname && target.pathname !== "/") diag.warn("URL path should not be set when using grpc, the path part of the URL will be ignored.");
	if (target.protocol !== "" && !target.protocol?.match(/^(http)s?:$/)) diag.warn("URL protocol should be http(s)://. Using http://.");
	return target.host;
}
function overrideMetadataEntriesIfNotPresent(metadata, additionalMetadata) {
	for (const [key, value] of Object.entries(additionalMetadata.getMap())) if (metadata.get(key).length < 1) metadata.set(key, value);
}
function mergeOtlpGrpcConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration) {
	const rawUrl = userProvidedConfiguration.url ?? fallbackConfiguration.url ?? defaultConfiguration.url;
	return {
		...mergeOtlpSharedConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration),
		metadata: () => {
			const metadata = defaultConfiguration.metadata();
			overrideMetadataEntriesIfNotPresent(metadata, userProvidedConfiguration.metadata?.().clone() ?? createEmptyMetadata());
			overrideMetadataEntriesIfNotPresent(metadata, fallbackConfiguration.metadata?.() ?? createEmptyMetadata());
			return metadata;
		},
		url: validateAndNormalizeUrl(rawUrl),
		credentials: userProvidedConfiguration.credentials ?? fallbackConfiguration.credentials?.(rawUrl) ?? defaultConfiguration.credentials(rawUrl),
		userAgent: userProvidedConfiguration.userAgent
	};
}
function getOtlpGrpcDefaultConfiguration() {
	return {
		...getSharedConfigurationDefaults(),
		metadata: () => createEmptyMetadata(),
		url: "http://localhost:4317",
		credentials: (url) => {
			if (url.startsWith("http://")) return () => createInsecureCredentials();
			else return () => createSslCredentials();
		}
	};
}
//#endregion
export { getOtlpGrpcDefaultConfiguration, mergeOtlpGrpcConfigurationWithDefaults, validateAndNormalizeUrl };

//# sourceMappingURL=otlp-grpc-configuration.mjs.map