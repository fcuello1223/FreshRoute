const require_runtime = require("./_virtual/_rolldown/runtime.cjs");
let _grpc_grpc_js = require("@grpc/grpc-js");
_grpc_grpc_js = require_runtime.__toESM(_grpc_grpc_js);
//#region src/create-service-client-constructor.ts
var create_service_client_constructor_exports = /* @__PURE__ */ require_runtime.__exportAll({ createServiceClientConstructor: () => createServiceClientConstructor });
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
	return _grpc_grpc_js.makeGenericClientConstructor(serviceDefinition, name);
}
var init_create_service_client_constructor = require_runtime.__esmMin((() => {}));
//#endregion
init_create_service_client_constructor();
exports.createServiceClientConstructor = createServiceClientConstructor;
Object.defineProperty(exports, "create_service_client_constructor_exports", {
	enumerable: true,
	get: function() {
		return create_service_client_constructor_exports;
	}
});
Object.defineProperty(exports, "init_create_service_client_constructor", {
	enumerable: true,
	get: function() {
		return init_create_service_client_constructor;
	}
});

//# sourceMappingURL=create-service-client-constructor.cjs.map