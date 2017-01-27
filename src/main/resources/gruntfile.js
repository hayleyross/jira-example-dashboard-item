module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            "default": {
                tsconfig: true
            }
        },
        karma: {
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-karma');

    // Karma does its own temporary typescript compilation (using different config) so no need to run ts first
    grunt.registerTask("default", ["karma:continuous", "ts"]);

};
