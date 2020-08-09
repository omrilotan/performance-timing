const {
	npm_config_argv: argv,
	npm_config_watch: watch,
} = process.env;

const pattern = (
	args => `../${args.length ? `**/+(${args.join('|')})` : '**'}/spec.js`
)(JSON.parse(argv).remain);

module.exports = config => {
	const { LOG_INFO } = config;

	config.set(
		{
			logLevel: LOG_INFO,
			singleRun: !watch,
			autoWatch: watch,
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
			files: [ { pattern, watch } ],
			preprocessors: { [pattern]: [ 'webpack' ] },
		},
	);
};
