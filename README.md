# performance-timing [![](https://img.shields.io/npm/v/performance-timing.svg)](https://www.npmjs.com/package/performance-timing) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/performance-timing) [![](https://badgen.net/bundlephobia/minzip/performance-timing)](https://bundlephobia.com/result?p=performance-timing)

A straight-forward interface to retrieving performance timing metrics.

### What does it do for me?
Retrieve metrics if they are available, otherwise, set up an observer to be resolved with extracted entries, then disconnected.

```js
import { getEntries } from 'performance-timing';

const [ navigation ] = await getEntries('navigation'); // PerformanceNavigationTiming{}
```

Return only when a conditional is met
```js
const [ navigation ] = getEntries(
	'navigation',
	{
		until: ([ entry ]) => (entry.loadEventEnd !== 0) // wait until page is loaded
	}
);
```

More Examples
```js
const [ firstInpt ] = await getEntries('first-input'); // PerformanceEventTiming{}
const resources = await getEntries('resource'); // [PerformanceResourceTiming{}, ...]
```

Mixed results
```js
const entries = await getEntries('navigation', 'paint');
```
