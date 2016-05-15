var path = require('path');
var del = require('del');

module.exports = function (gulp, resources) {
	gulp.task('clean', function () {
		return del([
			resources.out,
			resources.appJs,
			resources.serverJs
		]);
	});
};