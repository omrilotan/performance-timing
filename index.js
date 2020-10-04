/**
 * Retrieve list of PerformanceTiming objects via promise
 * @param {string}
 * @returns {Promise<PerformanceEntry[]>}
 */
export const getEntries = (...entryTypes) => new Promise(
	(resolve, reject) => {
		if (!window.performance) {
			reject(new Error('Performance API is not supported'));
			return;
		}

		const options = {
			until: () => true
		};

		const last = entryTypes[entryTypes.length - 1];

		if (typeof last === 'object') {
			Object.assign(options, last);
		}

		const entries = entryTypes.map(
			entryType => window.performance.getEntriesByType(entryType),
		).flat();

		if (entries.length && options.until(entries)) {
			resolve(entries);
			return;
		}

		if (typeof window.PerformanceObserver !== 'function') {
			reject(new Error('PerformanceObserver is not supported'));
			return;
		}

		const observer = new window.PerformanceObserver(
			(entryList, observer) => {
				if (options.until(entries)) {
					resolve(entryList.getEntries());
					observer.disconnect();
				}
			},
		);

		observer.observe({ entryTypes });
	},
);
