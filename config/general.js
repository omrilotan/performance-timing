const common = require('./common');

module.exports = config => config.set(
	common(
		{
			pattern: '../tests/general.js'
		}
	)
);
