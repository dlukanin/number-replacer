module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['commonjs', 'jasmine'],
        files: [
            'node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
            'lib/replace.js',
            'test/main.js',
        ],
        exclude: [],
        preprocessors: {
            'lib/replace.js': ['commonjs'],
            'test/main.js': ['commonjs']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Firefox', 'Chrome'],
        singleRun: true,
        concurrency: Infinity
    })
};