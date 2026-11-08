import { Instrumentation, InstrumentationConfig } from "../../types.mjs";
import { massUnwrap, massWrap, unwrap, wrap } from "../../shimmer.mjs";
import { InstrumentationAbstract } from "../../instrumentation.mjs";
//#region src/platform/node/instrumentation.d.ts
/**
 * Base abstract class for instrumenting node plugins
 */
declare abstract class InstrumentationBase<ConfigType extends InstrumentationConfig = InstrumentationConfig> extends InstrumentationAbstract<ConfigType> implements Instrumentation<ConfigType> {
  private _modules;
  private _hooks;
  private _requireInTheMiddleSingleton;
  /** Set by the base enable() and disable(); subclasses only read it. */
  protected _enabled: boolean;
  constructor(instrumentationName: string, instrumentationVersion: string, config: ConfigType);
  protected _wrap: typeof wrap;
  protected _unwrap: typeof unwrap;
  protected _massWrap: typeof massWrap;
  protected _massUnwrap: typeof massUnwrap;
  private _warnOnPreloadedModules;
  private _extractPackageVersion;
  private _onRequire;
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
}
//#endregion
export { InstrumentationBase };
//# sourceMappingURL=instrumentation.d.mts.map