module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
			banner: "/*! \n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %> (<%= pkg.status %>)\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *  Please, send us your feedback on <%= pkg.bugs.url %>\n" +
				" *\n" +
				" *  by <%= pkg.author.name %>\n" +
				" *  <%= pkg.author.email %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" *  This file was generated on: <%= grunt.template.today('dddd, mmmm dS, yyyy, h:MM:ss TT') %> \n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			jLogg_js : {
				dist: {
					src: ["src/jLogg.js"],
					dest: "dist/jLogg.js"
				}
			},
			main_js : {
				dist: {
					src: ["src/main.js"],
					dest: "dist/main.js"
				}
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jLogg.js", "src/main.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			options: {
		      	banner: "/*! \n" +
		      		" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %> (<%= pkg.status %>)\n" +
			      	" *  <%= pkg.author.name %> ~ <%= pkg.author.url %>*\n" +
			        " *  This file was generated on: <%= grunt.template.today('dddd, mmmm dS, yyyy, h:MM:ss TT') %>\n" +
		        	" */\n"
		    },
			min_jLogg: {
				src: ["src/jLogg.js"],
				dest: "dist/jLogg.min.js",
				options: {
					banner: "<%= meta.banner %>"
				}
			},
			min_main: {
				src: ["src/main.js"],
				dest: "dist/main.min.js"
			},
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
		    files: ['src/*'],
		    tasks: ['default']
		}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("build", ["concat", "uglify"]);
	grunt.registerTask("default", ["jshint", "build", "watch"]);
	grunt.registerTask("travis", ["default"]);

};
