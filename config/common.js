module.exports = ({ pattern }, overrides = {}) => Object.assign(
	{
		logLevel: 'INFO',
		singleRun: true,
		autoWatch: false,
		basePath: '',
		client: {
			useIframe: false,
		},
		frameworks: [ 'mocha' ],
		browsers: [ 'Chrome' ],
		browserNoActivityTimeout: 1 * 60 * 1000,
		port: 9876, // This is the default. Change it if you have ports collisions
		hooks : [
			'karma-webpack',
			'karma-chrome-launcher',
			'karma-mocha',
			'karma-mocha-reporter',
		],
		reporters: [ 'mocha' ],
		mochaReporter: { showDiff: true },
		webpackServer: {
			noInfo: true,
			stats: 'errors-only',
		},
		webpack: {},
		files: [ { pattern, watch: false } ],
		preprocessors: { [pattern]: [ 'webpack' ] },
	},
	overrides
);
