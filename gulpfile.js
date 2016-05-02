var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var argv = require('yargs').argv;
var browserSync = require('browser-sync').create();

var resources = {
    out: 'dist',
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
    imgs: 'app/assets/imgs/**/*',
    sourcemaps: typeof argv.sourcemaps != 'undefined' ? argv.sourcemaps : !argv.release
};

gulp.task('clean', function() {
    return del([
        resources.out,
        resources.javascript
    ]);
});

gulp.task('typescript', function() {
    var project = $.typescript.createProject('tsconfig.json', {
        typescript: require('typescript')
    });
    var tsResult = gulp.src(resources.typescript, {base: __dirname})
        .pipe($.if(resources.sourcemaps, $.sourcemaps.init()))
        .pipe($.typescript(project));
    return tsResult.js
        .pipe($.if(resources.sourcemaps, $.sourcemaps.write()))
        .pipe(gulp.dest(__dirname));
});

gulp.task('inject', function() {
    var appFiles = gulp.src(resources.css.concat(resources.javascript), { read: false });
    var vendorFiles = gulp.src(mainBowerFiles(), { read: false });

    return gulp.src(resources.views)
        .pipe($.inject(appFiles, { name: 'app', removeTags: true }))
        .pipe($.inject(vendorFiles, { name: 'vendor', removeTags: true }))
        .pipe(gulp.dest(resources.out));
});

gulp.task('useref', function() {
    var useref = gulp.src(path.join(resources.tmp, '**/*.html'))
        .pipe($.useref({ searchPath: __dirname, noconcat: !argv.release }));
    if (argv.release) {
        useref = useref
            .pipe($.if('*.js', $.uglify()))
            .pipe($.if('*.css', $.minifyCss()))
            .pipe($.if('!**/*.html', $.rev()))
            .pipe($.revReplace())
    }
    return useref
        .pipe(gulp.dest(resources.out));
});

gulp.task('copy', function() {
    return gulp.src(resources.imgs, { base: resources.assets })
        .pipe(gulp.dest(resources.out));
});

gulp.task('build', function(cb) {
    // $.sequence('clean', ['copy', 'fonts'], 'inject', 'useref', cb);
    $.sequence('clean', ['typescript', 'copy'], 'inject', cb);
});

gulp.task('serve', ['build'], function() {
    var app = require('./bin/www');

    // Serve files from the root of this project
    browserSync.init({
        proxy: 'localhost:65433'
    });

    $.watch([
        'bower.json',
        'public/**/*'
    ], function() {
        $.sequence('build', function() {
            setTimeout(browserSync.reload, 1000);
        });
    });
});

gulp.task('default', ['build']);
