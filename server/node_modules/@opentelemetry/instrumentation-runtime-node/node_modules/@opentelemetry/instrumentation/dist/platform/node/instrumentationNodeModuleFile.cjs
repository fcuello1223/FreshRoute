let path = require("path");
//#region src/platform/node/instrumentationNodeModuleFile.ts
var InstrumentationNodeModuleFile = class {
	name;
	supportedVersions;
	patch;
	unpatch;
	constructor(name, supportedVersions, patch, unpatch) {
		this.name = (0, path.normalize)(name);
		this.supportedVersions = supportedVersions;
		this.patch = patch;
		this.unpatch = unpatch;
	}
};
//#endregion
exports.InstrumentationNodeModuleFile = InstrumentationNodeModuleFile;

//# sourceMappingURL=instrumentationNodeModuleFile.cjs.map