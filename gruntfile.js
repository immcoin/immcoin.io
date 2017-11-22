module.exports = function(grunt) {
    
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    const mozjpeg = require('imagemin-mozjpeg');
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        imagemin : {
            dynamic : {
                options: {
                    optimizationLevel: 7,
                    progressive: true,
                    use: [mozjpeg()]
                },
                files : [{
                    expand: true,
                    cwd : 'assets/imagesource/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/images/'
                }]
            }
        },
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