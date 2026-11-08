//#region src/instrumentationNodeModuleDefinition.ts
var InstrumentationNodeModuleDefinition = class {
	files;
	name;
	supportedVersions;
	patch;
	unpatch;
	constructor(name, supportedVersions, patch, unpatch, files) {
		this.files = files || [];
		this.name = name;
		this.supportedVersions = supportedVersions;
		this.patch = patch;
		this.unpatch = unpatch;
	}
};
//#endregion
export { InstrumentationNodeModuleDefinition };

//# sourceMappingURL=instrumentationNodeModuleDefinition.mjs.map