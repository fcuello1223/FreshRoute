import { normalize } from "./noop-normalize.mjs";
//#region src/platform/browser/instrumentationNodeModuleFile.ts
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