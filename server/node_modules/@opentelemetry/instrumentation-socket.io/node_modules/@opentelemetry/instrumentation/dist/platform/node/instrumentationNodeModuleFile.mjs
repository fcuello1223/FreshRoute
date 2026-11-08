import { normalize } from "path";
//#region src/platform/node/instrumentationNodeModuleFile.ts
var InstrumentationNodeModuleFile = class {
	name;
	supportedVersions;
	patch;
	unpatch;
	constructor(name, supportedVersions, patch, unpatch) {
		this.name = normalize(name);
		this.supportedVersions = supportedVersions;
		this.patch = patch;
		this.unpatch = unpatch;
	}
};
//#endregion
export { InstrumentationNodeModuleFile };

//# sourceMappingURL=instrumentationNodeModuleFile.mjs.map