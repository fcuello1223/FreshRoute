import { __require, __toCommonJS } from "./_virtual/_rolldown/runtime.mjs";
import { VERSION } from "./version.mjs";
import { create_service_client_constructor_exports, init_create_service_client_constructor } from "./create-service-client-constructor.mjs";
//#region src/grpc-exporter-transport.ts
const DEFAULT_USER_AGENT = `OTel-OTLP-Exporter-JavaScript/${VERSION}`;
function createUserAgent(userAgent) {
	if (userAgent) return `${userAgent} ${DEFAULT_USER_AGENT}`;
	return DEFAULT_USER_AGENT;
}
const GRPC_COMPRESSION_NONE = 0;
const GRPC_COMPRESSION_GZIP = 2;
const GRPC_DEADLINE_EXCEEDED = 4;
/**
* The maximum number of deadline exceeded errors that will be tolerated before the client is closed.
*/
const MAX_DEADLINE_EXCEEDED_COUNT = 5;
function toGrpcCompression(compression) {
	return compression === "gzip" ? GRPC_COMPRESSION_GZIP : GRPC_COMPRESSION_NONE;
}
function createInsecureCredentials() {
	const { credentials } = __require("@grpc/grpc-js");
	return credentials.createInsecure();
}
function createSslCredentials(rootCert, privateKey, certChain) {
	const { credentials } = __require("@grpc/grpc-js");
	return credentials.createSsl(rootCert, privateKey, certChain);
}
function createEmptyMetadata() {
	const { Metadata } = __require("@grpc/grpc-js");
	return new Metadata();
}
var GrpcExporterTransport = class {
	_client;
	_metadata;
	_parameters;
	_deadlineExceededCount;
	constructor(parameters) {
		this._parameters = parameters;
		this._deadlineExceededCount = 0;
	}
	shutdown() {
		this._client?.close();
	}
	send(data, timeoutMillis) {
		const buffer = Buffer.from(data);
		if (this._client == null) {
			const { createServiceClientConstructor } = (init_create_service_client_constructor(), __toCommonJS(create_service_client_constructor_exports));
			try {
				this._metadata = this._parameters.metadata();
			} catch (error) {
				return Promise.resolve({
					status: "failure",
					error
				});
			}
			const clientConstructor = createServiceClientConstructor(this._parameters.grpcPath, this._parameters.grpcName);
			try {
				this._client = new clientConstructor(this._parameters.address, this._parameters.credentials(), {
					"grpc.default_compression_algorithm": toGrpcCompression(this._parameters.compression),
					"grpc.primary_user_agent": createUserAgent(this._parameters.userAgent)
				});
				this._deadlineExceededCount = 0;
			} catch (error) {
				return Promise.resolve({
					status: "failure",
					error
				});
			}
		}
		return new Promise((resolve) => {
			const deadline = Date.now() + timeoutMillis;
			if (this._metadata == null) return resolve({
				error: /* @__PURE__ */ new Error("metadata was null"),
				status: "failure"
			});
			this._client.export(buffer, this._metadata, { deadline }, (err, response) => {
				if (err) {
					resolve({
						status: "failure",
						error: err
					});
					if (err.code === GRPC_DEADLINE_EXCEEDED) {
						this._deadlineExceededCount++;
						if (this._deadlineExceededCount > MAX_DEADLINE_EXCEEDED_COUNT) {
							this._client?.close();
							this._client = void 0;
						}
					}
				} else {
					resolve({
						data: response,
						status: "success"
					});
					this._deadlineExceededCount = 0;
				}
			});
		});
	}
};
function createOtlpGrpcExporterTransport(options) {
	return new GrpcExporterTransport(options);
}
//#endregion
export { GrpcExporterTransport, createEmptyMetadata, createInsecureCredentials, createOtlpGrpcExporterTransport, createSslCredentials };

//# sourceMappingURL=grpc-exporter-transport.mjs.map