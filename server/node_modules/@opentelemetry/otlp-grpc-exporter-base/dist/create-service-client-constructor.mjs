import { __esmMin, __exportAll } from "./_virtual/_rolldown/runtime.mjs";
import * as grpc from "@grpc/grpc-js";
//#region src/create-service-client-constructor.ts
var create_service_client_constructor_exports = /* @__PURE__ */ __exportAll({ createServiceClientConstructor: () => createServiceClientConstructor });
/**
* Creates a unary service client constructor that, when instantiated, does not serialize/deserialize anything.
* Allows for passing in {@link Buffer} directly, serialization can be handled via protobufjs or custom implementations.
*
* @param path service path
* @param name service name
*/
function createServiceClientConstructor(path, name) {
	const serviceDefinition = { export: {
		path,
		requestStream: false,
		responseStream: false,
		requestSerialize: (arg) => {
			return arg;
		},
		requestDeserialize: (arg) => {
			return arg;
		},
		responseSerialize: (arg) => {
			return arg;
		},
		responseDeserialize: (arg) => {
			return arg;
		}
	} };
	return grpc.makeGenericClientConstructor(serviceDefinition, name);
}
var init_create_service_client_constructor = __esmMin((() => {}));
//#endregion
init_create_service_client_constructor();
export { createServiceClientConstructor, create_service_client_constructor_exports, init_create_service_client_constructor };

//# sourceMappingURL=create-service-client-constructor.mjs.map