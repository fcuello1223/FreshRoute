import { createEmptyMetadata } from "../grpc-exporter-transport.mjs";
import { getOtlpGrpcDefaultConfiguration, mergeOtlpGrpcConfigurationWithDefaults } from "./otlp-grpc-configuration.mjs";
import { getOtlpGrpcConfigurationFromEnv } from "./otlp-grpc-env-configuration.mjs";
//#region src/configuration/convert-legacy-otlp-grpc-options.ts
/**
* @deprecated
* @param config
* @param signalIdentifier
*/
function convertLegacyOtlpGrpcOptions(config, signalIdentifier) {
	const userProvidedCredentials = config.credentials;
	return mergeOtlpGrpcConfigurationWithDefaults({
		url: config.url,
		metadata: () => {
			return config.metadata ?? createEmptyMetadata();
		},
		compression: config.compression,
		timeoutMillis: config.timeoutMillis,
		concurrencyLimit: config.concurrencyLimit,
		credentials: userProvidedCredentials != null ? () => userProvidedCredentials : void 0,
		userAgent: config.userAgent
	}, getOtlpGrpcConfigurationFromEnv(signalIdentifier), getOtlpGrpcDefaultConfiguration());
}
//#endregion
export { convertLegacyOtlpGrpcOptions };

//# sourceMappingURL=convert-legacy-otlp-grpc-options.mjs.map