var $ = require('gulp-load-plugins')();
var del = require('del');
var mainBowerFiles = require('main-bower-files');

module.exports = function (gulp, resources) {
	gulp.task('inject', function () {
		var javascript = resources.appJs;
		var css = resources.css;
		var appFiles = gulp.src(css.concat(javascript), { read: false });
		var vendorFiles = gulp.src(mainBowerFiles().concat(resources.appJsVendor), { read: false });

		return gulp.src(resources.index)
			.pipe($.inject(appFiles, { name: 'app', removeTags: false }))
			.pipe($.inject(vendorFiles, { name: 'vendor', removeTags: false }))
			.pipe(gulp.dest(resources.out));
	});
};