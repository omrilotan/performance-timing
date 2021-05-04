import wait from '@lets/wait';

export function promiseStatus(promise) {
	if (['rejected', 'resolved'].includes(promise.status)) {
		return promise;
	}

	promise.status = 'pending';
	const result = promise.then(
		value => {
			promise.status = 'resolved';
			return value;
		},
		error => {
			promise.status = 'rejected';
			throw error;
		}
	);

	Object.defineProperty(
		result,
		'status',
		{
			get: () => promise.status
		}
	);

	return result;
}


export async function paintSomething() {
	wait(1000).then(
		() => {
			const h1 = document.createElement('h1');
			h1.appendChild(document.createTextNode('Hello there'));
			document.body.appendChild(h1);
		},
	);
}
