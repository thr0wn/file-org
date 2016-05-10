var $ = require('gulp-load-plugins')();
var gulp = $.help(require('gulp'));
var path = require('path');
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync').create();
var merge = require('merge-stream');
var argv = require('yargs').argv;

// Load config properties
process.env.NODE_ENV = argv.env ? argv.env : 'development';
process.env.NODE_CONFIG_DIR = 'build/properties';
var config = require('config');

var resources = {
	out: 'dist',
	index: 'app/index.html',
	views: [
		'app/**/*.html'
	],
	appJsVendor: [
		"node_modules/es6-shim/es6-shim.min.js",
		"node_modules/systemjs/dist/system-polyfills.js",
		"node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",
		"node_modules/angular2/bundles/angular2-polyfills.js",
		"node_modules/systemjs/dist/system.src.js",
		"node_modules/rxjs/bundles/Rx.js",
		"node_modules/angular2/bundles/angular2.dev.js",
		"node_modules/angular2/bundles/router.dev.js",
	],
	appJs: 'app/**/*.js',
	serverJs: 'server/**/*.js',
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
		resources.appJs,
		resources.serverJs
	]);
});

gulp.task('typescript-app', function () {
	var project = $.typescript.createProject('app/tsconfig.json', {
		typescript: require('typescript')
	});
	var tsResult = project.src()
		.pipe($.if(!config.get('build.optimize'), $.sourcemaps.init()))
		.pipe($.typescript(project));
	return tsResult.js
		.pipe($.if(!config.get('build.optimize'), $.sourcemaps.write()))
		.pipe(gulp.dest(__dirname + '/app'));
});

gulp.task('typescript-server', function () {
	var project = $.typescript.createProject('server/tsconfig.json', {
		typescript: require('typescript')
	});
	var tsResult = project.src()
		.pipe($.sourcemaps.init())
		.pipe($.typescript(project));
	return tsResult.js
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(__dirname + '/server'));
});

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

gulp.task('useref', function () {
	var useref = gulp.src(path.join(resources.out, '**/*.html'))
		.pipe($.useref({ searchPath: __dirname, noconcat: !config.get('build.optimize') }));
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

gulp.task('copy', function () {
	var stream = merge();

	var assets = gulp.src(resources.imgs, { base: resources.assets })
		.pipe(gulp.dest(resources.out));
	stream.add(assets);

	if (config.get('build.optimize')) {
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
	$.sequence('clean', ['typescript-app', 'typescript-server', 'copy'], 'inject', 'useref', cb);
}, { options: { '--env': 'environment string' } });

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
