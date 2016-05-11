var $ = require('gulp-load-plugins')();
var path = require('path');
var config = require('config');
var browserSync = require('browser-sync').create();

var rootDir = path.join(__dirname, '../..');

module.exports = function (gulp, resources) {
	gulp.task('serve', ['build'], function () {
		var app = require(path.join(rootDir, 'server/main.js'));

		// Serve files from the root of this project
		browserSync.init({
			proxy: 'localhost:' + config.get('server.port')
		});

		gulp.watch(['app/**/*'], ['build']).on('change', $.batch(function () {
			browserSync.reload();
		}));
	});
};