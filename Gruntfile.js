module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n",
			banner_2 : "/*\n" +
				" *  <%= pkg.name %>\n" +
				" *  All the logic for the page goes here\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: ["src/jLogg.js"],
				dest: "js/jLogg.js"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jLogg.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["js/jLogg.js"],
				dest: "js/jLogg.min.js",
				options: {
					banner: "<%= meta.banner %>"
				}
			},
			my_target_2: {
				src: ["js/main.js"],
				dest: "js/main.min.js",
				options: {
					banner: "<%= meta.banner_2 %>"
				}
			},
		},

		// CoffeeScript compilation
		coffee: {
			compile: {
				files: {
					"js/jLogg.js": "src/jLogg.coffee"
				}
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
		    files: ['src/*'],
		    tasks: ['default'],
		    css: {
				files: 'src/scss/*.scss',
				tasks: ['sass']
			},
			options: {
				livereload: true
			}
		},

		sass: {
			dist: {
				options: {
	                style: 'compressed'
	            },
				files: {
					"css/style.min.css" : "src/scss/style.scss"
				}
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-coffee");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-sass");

	grunt.registerTask("build", ["concat", "uglify"]);
	grunt.registerTask("default", ["jshint", "build", "watch"]);
	grunt.registerTask("travis", ["default"]);

};
