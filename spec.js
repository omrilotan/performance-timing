import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import wait from '@lets/wait';
import { getEntries } from '.';

chai.use(chaiAsPromised);

const { PerformanceObserver } = window;
const { expect } = chai;

describe('performance-timing', () => {
	afterEach(() => {
		window.PerformanceObserver = PerformanceObserver;
	});
	it('should return an empty object when PerformanceObserver is not supported', async() => {
		delete window.PerformanceObserver;
		return expect(getEntries()).to.be.rejectedWith('PerformanceObserver is not supported');
	});
	it('should return matching entries list by type', async() => {
		const records = await getEntries('resource');
		expect(records).to.have.lengthOf.at.least(5);
		records.forEach(
			record => expect(record).to.be.instanceof(PerformanceResourceTiming),
		);
	});
	it('should return matching entries if they already exist', async() => {
		expect(
			window.performance.getEntriesByType('navigation'),
		).to.have.lengthOf(1);

		const [ navigation ] = await getEntries('navigation');
		expect(navigation).to.be.instanceof(PerformanceNavigationTiming);
	});
	it('should collect multiple types of events and not wait for missing items', async() => {
		const entries = await getEntries('first-input', 'navigation', 'resource', 'paint');
		const types = entries.map(
			({ entryType }) => entryType,
		);
		expect(types).to.include('navigation');
		expect(types).to.include('resource');
		expect(types).not.to.include('paint');
		expect(types).not.to.include('first-input');
	});
	it('should wait for entries to exist', async () => {
		expect(
			window.performance.getEntriesByType('paint'),
		).to.have.lengthOf(0);
		paintSomething();

		const entries = await getEntries('paint');
		expect(entries).to.have.lengthOf(2);
		entries.forEach(
			entry => expect(entry).to.be.instanceof(PerformancePaintTiming),
		);
	});
});

async function paintSomething() {
	wait(1000).then(
		() => {
			const h1 = document.createElement('h1');
			h1.appendChild(document.createTextNode('Hello there'));
			document.body.appendChild(h1);
		},
	);
}
