var $ = require('gulp-load-plugins')();
var gulp = $.help(require('gulp'));
var path = require('path');
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var merge = require('merge-stream');

// Load config properties
process.env.NODE_CONFIG_DIR = 'build/properties';
var config = require('config');

var resources = {
    out: 'dist',
    index: 'app/index.html',
    views: [
        'app/**/*.html'
    ],
    typescript: [
        'typings/browser.d.ts',
        'app/**/*.ts'
    ],
    javascript: 'app/**/*.js',
    assets: 'app/assets',
    css: [
        'app/assets/css/*.css',
        'app/**/*.css'
    ],
    fonts: [
        'bower_components/components-font-awesome/fonts/**/*'
    ],
    imgs: 'app/assets/imgs/**/*'
};

gulp.task('clean', function () {
    return del([
        resources.out,
        resources.javascript
    ]);
});

gulp.task('typescript', function () {
    var project = $.typescript.createProject('app/tsconfig.json', {
        typescript: require('typescript')
    });
    var base = path.join(__dirname, 'app');
    var tsResult = gulp.src(resources.typescript, {cwd: base})
        .pipe($.if(resources.sourcemaps, $.sourcemaps.init()))
        .pipe($.typescript(project));
    return tsResult.js
        .pipe($.if(resources.sourcemaps, $.sourcemaps.write()))
        .pipe(gulp.dest(__dirname));
});

gulp.task('inject', function () {
    var appFiles = gulp.src(resources.css.concat(resources.javascript), { read: false });
    var vendorFiles = gulp.src(mainBowerFiles(), { read: false });

    return gulp.src(resources.index)
        .pipe($.inject(appFiles, { name: 'app', removeTags: false }))
        .pipe($.inject(vendorFiles, { name: 'vendor', removeTags: false }))
        .pipe(gulp.dest(resources.out));
});

gulp.task('useref', function () {
    var useref = gulp.src(path.join(resources.out, '**/*.html'))
        .pipe($.useref({ searchPath: __dirname, noconcat: !config.get('build.concat') }));
    if (config.get('build.minify')) {
        useref = useref
            .pipe($.if('*.js', $.uglify()))
            .pipe($.if('*.css', $.minifyCss()))
            .pipe($.if('!**/*.html', $.rev()))
            .pipe($.revReplace())
    }
    return useref
        .pipe(gulp.dest(resources.out));
});

gulp.task('copy', function () {
    var stream = merge();

    var assets = gulp.src(resources.imgs, { base: resources.assets })
        .pipe(gulp.dest(resources.out));
    stream.add(assets);

    if (config.get('build.minify')) {
        var html = gulp.src(resources.views, { base: __dirname })
        .pipe(gulp.dest(resources.out));
        stream.add(html);

        var fonts = gulp.src(resources.fonts)
            .pipe(gulp.dest(path.join(resources.out, 'fonts')));
        stream.add(fonts);
    }

    return stream;
});

gulp.task('build', '', function (cb) {
    // $.sequence('clean', ['copy', 'fonts'], 'inject', 'useref', cb);
    $.sequence('clean', ['typescript', 'copy'], 'inject', 'useref', cb);
}, {
  options: {
    '--release': 'generate release ready dist folder',
    '--sourcemaps': 'generate sourcemaps'
  }
});

gulp.task('serve', ['build'], function () {
    var app = require('./bin/www');

    // Serve files from the root of this project
    browserSync.init({
        proxy: 'localhost:65433'
    });

    $.watch([
        'bower.json',
        'public/**/*'
    ], function () {
        $.sequence('build', function () {
            setTimeout(browserSync.reload, 1000);
        });
    });
});

gulp.task('default', ['build']);
