// Karma configuration
// Generated on Fri Jan 27 2017 11:23:56 GMT+0000 (GMT Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'karma-typescript'],


        karmaTypescriptConfig: {
            bundlerOptions: {
                exclude: ['wrm/contextPath'],
                validateSyntax: false
            },
            coverageOptions: {
                instrumentation: false
            },
            reports: null,
            exclude: ['typescript/additionalTypings/**']
        },


        // list of files / patterns to load in the browser
        // only test modules which don't depend on dependencies provided at run-time by Jira
        files: [
            {pattern: 'typescript/main/models/**/*.ts'},
            {pattern: 'typescript/test/models/**/*Spec.ts'}
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'typescript/**/*.ts': ['karma-typescript']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'karma-typescript'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // this gets overriden by the gruntfile so that mvn package uses PhantomJS
        browsers: ['Chrome'],

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};
