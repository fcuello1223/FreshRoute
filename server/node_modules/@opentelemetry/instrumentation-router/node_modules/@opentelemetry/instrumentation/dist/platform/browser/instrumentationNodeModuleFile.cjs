const require_noop_normalize = require("./noop-normalize.cjs");
//#region src/platform/browser/instrumentationNodeModuleFile.ts
var InstrumentationNodeModuleFile = class {
	name;
	supportedVersions;
	patch;
	unpatch;
	constructor(name, supportedVersions, patch, unpatch) {
		this.name = require_noop_normalize.normalize(name);
		this.supportedVersions = supportedVersions;
		this.patch = patch;
		this.unpatch = unpatch;
	}
};
//#endregion
exports.InstrumentationNodeModuleFile = InstrumentationNodeModuleFile;

//# sourceMappingURL=instrumentationNodeModuleFile.cjs.map