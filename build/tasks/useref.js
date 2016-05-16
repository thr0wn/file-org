var $ = require('gulp-load-plugins')();
var path = require('path');
var config = require('config');

var rootDir = path.join(__dirname, '../..');

module.exports = function (gulp, resources) {
	gulp.task('useref', function () {
		var useref = gulp.src(path.join(resources.out, '**/*.html'))
			.pipe($.useref({ searchPath: rootDir, noconcat: !config.get('build.optimize') }));
		if (config.get('build.optimize')) {
			useref = useref
				.pipe($.if('*.js', $.uglify()))
				.pipe($.if('*.css', $.minifyCss()))
				.pipe($.if('!**/*.html', $.rev()))
				.pipe($.revReplace())
		}
		return useref
			.pipe(gulp.dest(resources.out));
	});
};