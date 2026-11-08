import { InstrumentationModuleDefinition, InstrumentationModuleFile } from "./types.cjs";
//#region src/instrumentationNodeModuleDefinition.d.ts
declare class InstrumentationNodeModuleDefinition implements InstrumentationModuleDefinition {
  files: InstrumentationModuleFile[];
  name: string;
  supportedVersions: string[];
  patch: ((exports: any, moduleVersion?: string) => any) | undefined;
  unpatch: ((exports: any, moduleVersion?: string) => void) | undefined;
  constructor(name: string, supportedVersions: string[], patch?: (exports: any, moduleVersion?: string) => any, unpatch?: (exports: any, moduleVersion?: string) => void, files?: InstrumentationModuleFile[]);
}
//#endregion
export { InstrumentationNodeModuleDefinition };
//# sourceMappingURL=instrumentationNodeModuleDefinition.d.cts.map