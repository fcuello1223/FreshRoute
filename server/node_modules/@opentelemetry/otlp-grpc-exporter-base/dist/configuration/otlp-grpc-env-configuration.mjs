import { createEmptyMetadata, createInsecureCredentials, createSslCredentials } from "../grpc-exporter-transport.mjs";
import { diag } from "@opentelemetry/api";
import { parseKeyPairsIntoRecord } from "@opentelemetry/core";
import { getSharedConfigurationFromEnvironment } from "@opentelemetry/otlp-exporter-base/node-http";
import * as fs from "fs";
import * as path from "path";
//#region src/configuration/otlp-grpc-env-configuration.ts
function fallbackIfNullishOrBlank(signalSpecific, nonSignalSpecific) {
	if (signalSpecific != null && signalSpecific !== "") return signalSpecific;
	if (nonSignalSpecific != null && nonSignalSpecific !== "") return nonSignalSpecific;
}
function getMetadataFromEnv(signalIdentifier) {
	const signalSpecificRawHeaders = process.env[`OTEL_EXPORTER_OTLP_${signalIdentifier}_HEADERS`]?.trim();
	const nonSignalSpecificRawHeaders = process.env["OTEL_EXPORTER_OTLP_HEADERS"]?.trim();
	const signalSpecificHeaders = parseKeyPairsIntoRecord(signalSpecificRawHeaders);
	const nonSignalSpecificHeaders = parseKeyPairsIntoRecord(nonSignalSpecificRawHeaders);
	if (Object.keys(signalSpecificHeaders).length === 0 && Object.keys(nonSignalSpecificHeaders).length === 0) return;
	const mergeHeaders = Object.assign({}, nonSignalSpecificHeaders, signalSpecificHeaders);
	const metadata = createEmptyMetadata();
	for (const [key, value] of Object.entries(mergeHeaders)) metadata.set(key, value);
	return metadata;
}
function getMetadataProviderFromEnv(signalIdentifier) {
	const metadata = getMetadataFromEnv(signalIdentifier);
	if (metadata == null) return;
	return () => metadata;
}
function getUrlFromEnv(signalIdentifier) {
	const specificEndpoint = process.env[`OTEL_EXPORTER_OTLP_${signalIdentifier}_ENDPOINT`]?.trim();
	const nonSpecificEndpoint = process.env["OTEL_EXPORTER_OTLP_ENDPOINT"]?.trim();
	return fallbackIfNullishOrBlank(specificEndpoint, nonSpecificEndpoint);
}
/**
* Determines whether the env var for insecure credentials is set to {@code true}.
*
* It will allow the following values as {@code true}
* - 'true'
* - 'true   '
* - '   true'
* - 'TrUE'
* - 'TRUE'
*
* It will not allow:
* - 'true false'
* - 'false true'
* - 'true!'
* - 'true,true'
* - '1'
* - ' '
*
* @param signalIdentifier
*/
function getInsecureSettingFromEnv(signalIdentifier) {
	const signalSpecificInsecureValue = process.env[`OTEL_EXPORTER_OTLP_${signalIdentifier}_INSECURE`]?.toLowerCase().trim();
	const nonSignalSpecificInsecureValue = process.env["OTEL_EXPORTER_OTLP_INSECURE"]?.toLowerCase().trim();
	return fallbackIfNullishOrBlank(signalSpecificInsecureValue, nonSignalSpecificInsecureValue) === "true";
}
function readFileFromEnv(signalSpecificEnvVar, nonSignalSpecificEnvVar, warningMessage) {
	const signalSpecificPath = process.env[signalSpecificEnvVar]?.trim();
	const nonSignalSpecificPath = process.env[nonSignalSpecificEnvVar]?.trim();
	const filePath = fallbackIfNullishOrBlank(signalSpecificPath, nonSignalSpecificPath);
	if (filePath != null) try {
		return fs.readFileSync(path.resolve(process.cwd(), filePath));
	} catch {
		diag.warn(warningMessage);
		return;
	}
	else return;
}
function getClientCertificateFromEnv(signalIdentifier) {
	return readFileFromEnv(`OTEL_EXPORTER_OTLP_${signalIdentifier}_CLIENT_CERTIFICATE`, "OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE", "Failed to read client certificate chain file");
}
function getClientKeyFromEnv(signalIdentifier) {
	return readFileFromEnv(`OTEL_EXPORTER_OTLP_${signalIdentifier}_CLIENT_KEY`, "OTEL_EXPORTER_OTLP_CLIENT_KEY", "Failed to read client certificate private key file");
}
function getRootCertificateFromEnv(signalIdentifier) {
	return readFileFromEnv(`OTEL_EXPORTER_OTLP_${signalIdentifier}_CERTIFICATE`, "OTEL_EXPORTER_OTLP_CERTIFICATE", "Failed to read root certificate file");
}
function getCredentialsFromEnvIgnoreInsecure(signalIdentifier) {
	const clientKey = getClientKeyFromEnv(signalIdentifier);
	const clientCertificate = getClientCertificateFromEnv(signalIdentifier);
	const rootCertificate = getRootCertificateFromEnv(signalIdentifier);
	if (rootCertificate != null && !(clientKey != null && clientCertificate != null)) {
		diag.warn("Client key and certificate must both be provided, but one was missing - attempting to create credentials from just the root certificate");
		return createSslCredentials(getRootCertificateFromEnv(signalIdentifier));
	}
	return createSslCredentials(rootCertificate, clientKey, clientCertificate);
}
function getCredentialsFromEnv(signalIdentifier) {
	if (getInsecureSettingFromEnv(signalIdentifier)) return createInsecureCredentials();
	return getCredentialsFromEnvIgnoreInsecure(signalIdentifier);
}
function getOtlpGrpcConfigurationFromEnv(signalIdentifier) {
	return {
		...getSharedConfigurationFromEnvironment(signalIdentifier),
		metadata: getMetadataProviderFromEnv(signalIdentifier),
		url: getUrlFromEnv(signalIdentifier),
		credentials: (finalResolvedUrl) => {
			if (finalResolvedUrl.startsWith("http://")) return () => {
				return createInsecureCredentials();
			};
			else if (finalResolvedUrl.startsWith("https://")) return () => {
				return getCredentialsFromEnvIgnoreInsecure(signalIdentifier);
			};
			return () => {
				return getCredentialsFromEnv(signalIdentifier);
			};
		}
	};
}
//#endregion
export { getOtlpGrpcConfigurationFromEnv };

//# sourceMappingURL=otlp-grpc-env-configuration.mjs.map