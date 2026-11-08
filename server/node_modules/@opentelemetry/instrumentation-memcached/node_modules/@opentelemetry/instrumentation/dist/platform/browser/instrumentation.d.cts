import { Instrumentation, InstrumentationConfig } from "../../types.cjs";
import { InstrumentationAbstract } from "../../instrumentation.cjs";
//#region src/platform/browser/instrumentation.d.ts
/**
 * Base abstract class for instrumenting web plugins
 */
declare abstract class InstrumentationBase<ConfigType extends InstrumentationConfig = InstrumentationConfig> extends InstrumentationAbstract<ConfigType> implements Instrumentation<ConfigType> {
  /** Subclasses set this to true when their enable() succeeds and to false in
   * their disable(); isEnabled() returns it. */
  protected _enabled: boolean;
  constructor(instrumentationName: string, instrumentationVersion: string, config: ConfigType);
  /** Returns `_enabled`, which stays false unless the subclass's enable() sets it. */
  isEnabled(): boolean;
}
//#endregion
export { InstrumentationBase };
//# sourceMappingURL=instrumentation.d.cts.map