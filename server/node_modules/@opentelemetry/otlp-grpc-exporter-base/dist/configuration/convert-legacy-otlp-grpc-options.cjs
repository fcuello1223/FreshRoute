require("../_virtual/_rolldown/runtime.cjs");
const require_grpc_exporter_transport = require("../grpc-exporter-transport.cjs");
const require_otlp_grpc_configuration = require("./otlp-grpc-configuration.cjs");
const require_otlp_grpc_env_configuration = require("./otlp-grpc-env-configuration.cjs");
//#region src/configuration/convert-legacy-otlp-grpc-options.ts
/**
* @deprecated
* @param config
* @param signalIdentifier
*/
function convertLegacyOtlpGrpcOptions(config, signalIdentifier) {
	const userProvidedCredentials = config.credentials;
	return require_otlp_grpc_configuration.mergeOtlpGrpcConfigurationWithDefaults({
		url: config.url,
		metadata: () => {
			return config.metadata ?? require_grpc_exporter_transport.createEmptyMetadata();
		},
		compression: config.compression,
		timeoutMillis: config.timeoutMillis,
		concurrencyLimit: config.concurrencyLimit,
		credentials: userProvidedCredentials != null ? () => userProvidedCredentials : void 0,
		userAgent: config.userAgent
	}, require_otlp_grpc_env_configuration.getOtlpGrpcConfigurationFromEnv(signalIdentifier), require_otlp_grpc_configuration.getOtlpGrpcDefaultConfiguration());
}
//#endregion
exports.convertLegacyOtlpGrpcOptions = convertLegacyOtlpGrpcOptions;

//# sourceMappingURL=convert-legacy-otlp-grpc-options.cjs.map