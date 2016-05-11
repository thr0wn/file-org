var $ = require('gulp-load-plugins')();
var path = require('path');
var config = require('config');
var typescript = require('typescript');

var rootDir = path.join(__dirname, '../..');
var project = $.typescript.createProject(
	path.join(rootDir, 'app/tsconfig.json'),
	{ typescript: typescript }
);

module.exports = function (gulp) {
	gulp.task('typescript-app', function () {
		var tsResult = project.src()
			.pipe($.if(!config.get('build.optimize'), $.sourcemaps.init()))
			.pipe($.typescript(project));
		return tsResult.js
			.pipe($.if(!config.get('build.optimize'), $.sourcemaps.write()))
			.pipe(gulp.dest('app'));
	});
};