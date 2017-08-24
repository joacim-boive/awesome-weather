
// const webpackEnv = {test: true};
// const webpackConfig = require('./webpack.config');
const webpackConfig = require('./webpack.config');
const fileGlob = 'src/**/*.test.js';

module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [fileGlob],
        preprocessors: {
            [fileGlob]: ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {noInfo: true},
        reporters: ['progress', 'mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Firefox'],
        singleRun: true,
        concurrency: Infinity,
    });
};
