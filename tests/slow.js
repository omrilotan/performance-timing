import chai from 'chai';
import wait from '@lets/wait';
import { promiseStatus } from './helpers';
import { getEntries } from '..';

const { expect } = chai;

describe('performance-timing', () => {
	it('should wait for a condition', async function() {
		this.timeout(120000);
		const promise = promiseStatus(
			getEntries(
				'navigation',
				{
					until: ([ entry ]) => (entry.loadEventEnd !== 0)
				}
			)
		);

		await wait(0);
		expect(performance.getEntriesByType('navigation')[0].loadEventEnd).to.equal(0);
		expect(promise.status).to.equal('pending');

		const entries = await promise;
		expect(performance.getEntriesByType('navigation')[0].loadEventEnd).to.not.equal(0);
		expect(promise.status).to.equal('resolved');
	});
});
