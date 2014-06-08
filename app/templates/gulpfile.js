var express        = require('express');
var gulp           = require('gulp');
var livereload     = require('gulp-livereload');
var rename         = require('gulp-rename');
var runSequence    = require('run-sequence');
var fileinclude    = require('gulp-file-include');
// var rewriteModule  = require('http-rewrite-middleware');
// var sass           = require('gulp-ruby-sass');
// var useref         = require('gulp-useref');
// var filter         = require('gulp-filter');
// var uglify         = require('gulp-uglify');
// var csso           = require('gulp-csso');
// var rimraf         = require('gulp-rimraf');
// var jshint_stylish = require('jshint-stylish');
// var jshint         = require('gulp-jshint');
// var smoosher       = require('gulp-smoosher');
// var through        = require('through2');
// var cheerio        = require('cheerio');
// var gutil          = require('gulp-util');
// var fs             = require('fs');
// var path           = require('path');
// var concat         = require('gulp-concat');
// var template       = require('gulp-template-compile');

var LIVERELOAD_PORT = 35728;
var EXPRESS_PORT = 5000;

// start server
function server(callback) {

	var app = express();
	app.use(express.static(__dirname));
	app.listen(EXPRESS_PORT);

	callback && callback();
}

// start livereload
function startLivereload() {
	var server = livereload(LIVERELOAD_PORT);

	// watch for changes to html and rebuild
	gulp.watch([
		'html/html.html',
	], ['build-html']);

	// // watch for changes to scss and recompile
	// gulp.watch(['css/*'], ['compile-stylesheets']);

	// gulp.watch(['index.html', '.tmp/**/*.css', 'js/**/*.js'], function(e) {

	// watch for changes to index.html, dest files, js files, and notify livereload
	gulp.watch(['index.html'], function(e) {
		server.changed(e.path);
	});

	// // watch for changes to templates and recompile
	// gulp.watch(['js/templates/*.template'], ['compile-templates']);
}


// gulp.task('choose-css', function() {
// 	return gulp.src(isStandalone ? 'css/standalone.template' : 'css/homepage.template')
// 		.pipe(rename('main.scss'))
// 		.pipe(gulp.dest('css'));
// });

gulp.task('build-html', function() {
	return gulp.src('html/template.html')
		.pipe(fileinclude())
		.pipe(rename('index.html'))
		.pipe(gulp.dest('.'));
});

// gulp.task('compile-stylesheets', function() {
// 	return gulp.src(['css/*', '!css/*.template'])
// 		.pipe(sass({compass: true}))
// 		.pipe(gulp.dest('.tmp'));
// });

// gulp.task('compile-templates', function() {
// 	return gulp.src('js/templates/*.template')
// 		.pipe(template({
// 			templateSettings: {
// 				interpolate: /{{([\s\S]+?)}}/g,
// 				evaluate:    /{=([\s\S]+?)=}/g
// 			}
// 		}))
// 		.pipe(concat('templates.js'))
// 		.pipe(gulp.dest('js/templates'));
// });

gulp.task('start-livereload', function(callback) {
	server(startLivereload);

	callback && callback();
});

// gulp.task('clean', function() {
// 	return gulp.src([
// 		'.tmp',
// 		'PROD.jpt',
// 		'css/main.scss',
// 		'js/templates/templates.js'
// 	], {read:false}).pipe(rimraf());
// });

// function devBuild(_isStandalone) {
// 	isStandalone = _isStandalone;
// 	runSequence(
// 		'clean',
// 		'choose-css',
// 		'compile-stylesheets',
// 		'compile-templates',
// 		'build-html',
// 		'start-livereload'
// 	);
// }

// gulp.task('standalone', function() {
// 	devBuild(true);
// });

// gulp.task('homepage', function() {
// 	devBuild(false);
// });

gulp.task('default', function() {

	runSequence(
		'build-html',
		'start-livereload'
	);

});







