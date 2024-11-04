export function debounce(func, wait) {
	let timeout;
	return function (...args) {
		const context = this;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
			func.apply(context, args);
		}, wait);
	};
}

function hasFileUrls(item) {
	return item?.fileUrls?.length > 0;
}

export function hasFileUploadedCheck(signage) {
	return signage.some((item) => hasFileUrls(item));
}
