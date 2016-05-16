var path = require('path');
var merge = require('merge-stream');
var config = require('config');

var rootDir = path.join(__dirname, '../..');

module.exports = function (gulp, resources) {
    gulp.task('copy', function () {
        var stream = merge();

        var assets = gulp.src(resources.imgs, { base: resources.assets })
            .pipe(gulp.dest(resources.out));
        stream.add(assets);

        if (config.get('build.optimize')) {
            var html = gulp.src(resources.views, { base: rootDir })
                .pipe(gulp.dest(resources.out));
            stream.add(html);

            var fonts = gulp.src(resources.fonts)
                .pipe(gulp.dest(path.join(resources.out, 'fonts')));
            stream.add(fonts);
        }

        return stream;
    });
};