var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var liveReload = require('gulp-livereload');
var rjs = require('gulp-requirejs');
var gulpIgnore = require('gulp-ignore');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');

var destPath = '/';

gulp.task('cleanScripts', function () {
	return gulp.src([destPath + '/scripts/*'], { read: false })
		.pipe(plumber())
		.pipe(clean({ force: true }));
});

gulp.task('scripts', ['cleanScripts'], function () {
	return gulp.src(['/scripts/**/*.{js,html}'])
		.pipe(plumber())
		.pipe(gulp.dest(destPath + '/js'));
});

gulp.task('main', function () {

	return rjs({
		baseUrl: './scripts/',

		paths: {
			//'constants': 'Constants',
			//'Templates': '../Templates',
			'text': 'Libs/text',
			'jquery': 'Libs/jquery-1.10.2.min',
			'jquery-ie9fix': 'Libs/jquery-ie9fix',
			'backbone': 'Libs/backbone',
			'underscore': 'Libs/underscore',
			'async': 'Libs/async',
			'gmaps-sensor': 'Libs/gmaps-sensor',
			'modernizr': 'Libs/modernizr.custom',
			'i18n': 'Libs/i18next.amd-1.7.3.min'
		},

		shim: {
			'backbone': {
				deps: ['underscore', 'jquery', 'jquery-ie9fix'],
				exports: 'Backbone'
			},

			'underscore': {
				exports: '_'
			},

			'jquery': {
				exports: '$'
			},

			'modernizr': {
				exports: 'Modernizr'
			}
		},

		name: 'InitOrder',

		out: 'main.js'
	})
	.pipe(gulp.dest(destPath + '/scripts'));

});

watch('scripts//*.{js,html}', function () {
	gulp.start('scripts');
});


gulp.task('default', ['cleanScripts', 'scripts']);