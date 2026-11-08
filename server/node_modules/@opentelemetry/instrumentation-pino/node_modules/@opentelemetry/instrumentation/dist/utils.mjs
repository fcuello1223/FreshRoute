//#region src/utils.ts
/**
* function to execute patched function and being able to catch errors
* @param execute - function to be executed
* @param onFinish - callback to run when execute finishes
*/
function safeExecuteInTheMiddle(execute, onFinish, preventThrowingError) {
	let error;
	let result;
	try {
		result = execute();
	} catch (e) {
		error = e;
	} finally {
		onFinish(error, result);
		if (error && !preventThrowingError) throw error;
		return result;
	}
}
/**
* Async function to execute patched function and being able to catch errors
* @param execute - function to be executed
* @param onFinish - callback to run when execute finishes
*/
async function safeExecuteInTheMiddleAsync(execute, onFinish, preventThrowingError) {
	let error;
	let result;
	try {
		result = await execute();
	} catch (e) {
		error = e;
	} finally {
		await onFinish(error, result);
		if (error && !preventThrowingError) throw error;
		return result;
	}
}
/**
* Checks if certain function has been already wrapped
* @param func
*/
function isWrapped(func) {
	return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
}
//#endregion
export { isWrapped, safeExecuteInTheMiddle, safeExecuteInTheMiddleAsync };

//# sourceMappingURL=utils.mjs.map