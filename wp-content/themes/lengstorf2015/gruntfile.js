// Gets the theme root
var theme_root = '/wp-content/themes/' + __dirname.split('/').pop();

module.exports = function(grunt) {

    // Dynamically loads all required grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
   
    grunt.initConfig({
        uglify: {
            options: {
                mangle: true,
                compress: {},
                preserveComments: 'some',
                sourceMap: true,
            },
            js: {
                files: {
                    'assets/js/main.min.js': ['assets/js/main.js']
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'assets/js/main.js']
        },
        less: {
            options: {
                compress: true,
                yuicompress: true,
                optimization: 2,
                sourceMap: true,
                // sourceMapURL: theme_root + '/assets/css/main.min.css.map',
                // sourceMapFilename: 'assets/css/main.min.css.map',
                // sourceMapBasepath: 'assets/css/',
                // sourceMapRootpath: theme_root
            },
            style: {
                files: {
                    'assets/css/main.min.css': 'assets/less/main.less',
                    'assets/css/ie.css': 'assets/less/ie.less',
                }
            }
        },
        autoprefixer: {
            options: {
                map: true,
            },
            main: {
                src: 'assets/css/main.min.css',
            },
        },
        wiredep: {
            task: {
                src: [
                    'functions.php'
                ],
                options: {
                    exclude: [ 
                        "includes/jquery/",
                        "includes/bootstrap/",
                        "includes/tgm-plugin-activation" 
                    ],
                    fileTypes: {
                        php: {
                            block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                            detect: {
                                js: /script\(.*src=['"]([^'"]+)/gi,
                                css: /link\(.*href=['"]([^'"]+)/gi
                            },
                            replace: {
                                js: function(filePath){
                                    var fileName = filePath.substring(filePath.lastIndexOf('/')+1);
                                    var wpHandle = fileName.replace(".","-");
                                    return "wp_enqueue_script('"+wpHandle+"', get_stylesheet_directory_uri() . '/"+filePath+"');";
                                },
                                css: function(filePath){
                                    var fileName = filePath.substring(filePath.lastIndexOf('/')+1);
                                    var wpHandle = fileName.replace(".","-");
                                    return "wp_enqueue_style('"+wpHandle+"', get_stylesheet_directory_uri() . '/"+filePath+"');";
                                }
                            }
                        }
                    }
                }
            }
        },

        // To use TinyPNG, get an API key from https://tinypng.com/developers
        tinypng: {
            options: {
                apiKey: 'NsWCKVbTvNt6mG12L_uZJMrnT1eB-3IW',
                checkSigs: true,
                sigFile: 'assets/images/file_sigs.json',
                summarize: true,
                showProgress: true
            },
            compress: {
                src: '*.png',
                cwd: 'assets/images/',
                dest: 'assets/images/',
                expand: true
            }
        },
        watch: {
            js: {
                files: [ 'assets/js/*.js' ],
                tasks: [ 'uglify:js', 'jshint:all' ],
                options: {
                    livereload: true,
                }
            },
            css: {
                files: [ 'assets/less/*.less' ],
                tasks: [ 'less:style', 'autoprefixer:main' ],
                options: {
                    livereload: true,
                }
            },
            png: {
                files: [ 'assets/images/*.png' ],
                tasks: [ 'tinypng' ]
            },
            php: {
                files: [ '*.php' ],
                options: {
                    livereload: true,
                }
            },
            bower: {
                files: [ 'bower.json' ],
                tasks: [ 'wiredep' ],
                options: {
                    livereload: true
                }
            }
        },
        php: {
            server: {
                options: {
                    base: '../../..',
                    // hostname: 'localhost',
                    hostname: 'lengstorf.dev',
                    port: 5000,
                    keepalive: true,
                    open: true
                }
            }
        },
        concurrent: {
          dev: {
            tasks: [ 'php:server', 'watch' ],
            options: {
              logConcurrentOutput: true
            }
          }
        },
    });

    // Compiles LESS/JS, wires dependencies, concats and hints
    grunt.registerTask('default', [
        'less',
        'autoprefixer',
        'wiredep',
        'jshint',
        'uglify'
    ]);

    grunt.registerTask( 'serve', [ 'concurrent' ]);
};
