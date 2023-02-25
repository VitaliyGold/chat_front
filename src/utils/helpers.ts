export function debounce(fn: any, delay: number) {
	let timeoutID: ReturnType<typeof setTimeout>;
	return (...args: any) => {
		if (timeoutID) { clearTimeout(timeoutID); }
		timeoutID = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
