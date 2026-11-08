import { InstrumentationModuleFile } from "../../types.cjs";
//#region src/platform/node/instrumentationNodeModuleFile.d.ts
declare class InstrumentationNodeModuleFile implements InstrumentationModuleFile {
  name: string;
  supportedVersions: string[];
  patch: (moduleExports: any, moduleVersion?: string) => any;
  unpatch: (moduleExports?: any, moduleVersion?: string) => void;
  constructor(name: string, supportedVersions: string[], patch: (moduleExports: any, moduleVersion?: string) => any, unpatch: (moduleExports?: any, moduleVersion?: string) => void);
}
//#endregion
export { InstrumentationNodeModuleFile };
//# sourceMappingURL=instrumentationNodeModuleFile.d.cts.map