module.exports = function(grunt){
    
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    hostname:'localhost',
                    port: 9002,
                    keepalive: true,
                    open: true
                }
            }
        },
        less: {
            development: {
                options: {
                    paths:["less/"]
                },
                files: {
                    "css/style.css": "less/*.less"
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/css/app.min.css': ['css/*.css' ]
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'js/*.js']
        },
        uglify: {
            js: {
                files: {
                    'build/js/app.min.js': ['js/*.js']
                }
            },
            options: {
                mangle: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Start web server
    grunt.registerTask('build', ['less', 'cssmin', 'jshint', 'uglify']);
    grunt.registerTask('default', ['connect:server']);
};
