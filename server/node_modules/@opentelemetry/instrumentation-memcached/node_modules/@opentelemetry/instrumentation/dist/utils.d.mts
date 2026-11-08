import { ShimWrapped } from "./types.mjs";
//#region src/utils.d.ts
/**
 * function to execute patched function and being able to catch errors
 * @param execute - function to be executed
 * @param onFinish - callback to run when execute finishes
 */
declare function safeExecuteInTheMiddle<T>(execute: () => T, onFinish: (e: Error | undefined, result: T | undefined) => void, preventThrowingError?: boolean): T;
/**
 * Async function to execute patched function and being able to catch errors
 * @param execute - function to be executed
 * @param onFinish - callback to run when execute finishes
 */
declare function safeExecuteInTheMiddleAsync<T>(execute: () => T, onFinish: (e: Error | undefined, result: T | undefined) => Promise<void> | void, preventThrowingError?: boolean): Promise<T>;
/**
 * Checks if certain function has been already wrapped
 * @param func
 */
declare function isWrapped(func: unknown): func is ShimWrapped;
//#endregion
export { isWrapped, safeExecuteInTheMiddle, safeExecuteInTheMiddleAsync };
//# sourceMappingURL=utils.d.mts.map