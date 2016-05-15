var $ = require('gulp-load-plugins')();
var path = require('path');
var typescript = require('typescript');

var rootDir = path.join(__dirname, '../..');
var project = $.typescript.createProject(
	path.join(rootDir, 'server/tsconfig.json'),
	{ typescript: typescript }
);

// sourcemap fix
function sourceRootGen(file) {
	if (!file.sourceMap.sources[0]) {
		return;
	}
	var source = path.parse(file.sourceMap.sources[0]);
	return source.dir.replace(/\w+(?=\/|$)/g, '..');
}

module.exports = function (gulp) {
	gulp.task('typescript-server', function () {
		var tsResult = project.src()
			.pipe($.sourcemaps.init())
			.pipe($.typescript(project));
		return tsResult.js
			.pipe($.sourcemaps.write({
				includeContent: true,
				sourceRoot: sourceRootGen
			}))
			.pipe(gulp.dest('server'));
	});
};