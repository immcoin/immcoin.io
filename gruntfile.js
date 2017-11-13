module.exports = function(grunt) {
    
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        develop : {
            server : {
                file : './app.js'
            }
        },
        watch : {
            css : {
                files : [
                    'assets/css/*.sass'
                ],
                tasks : ['sass']
            }
        },
        sass : {
            dist : {
                files : {
                    'assets/css/style.css' : 'assets/css/style.sass'
                }
            }
        }
    });

    grunt.registerTask('default', ['sass','develop', 'watch']);
}