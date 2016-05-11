var $ = require('gulp-load-plugins')();
var gulp = $.help(require('gulp'));
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

requireTask('postinstall');
requireTask('clean');
requireTask('typescript-app');
requireTask('typescript-server');
requireTask('inject');
requireTask('useref');
requireTask('copy');

gulp.task('build', '', function (cb) {
	$.sequence('clean', ['typescript-app', 'typescript-server', 'copy'], 'inject', 'useref', cb);
}, { options: { '--env': 'node environment value (process.env.NODE_ENV)' } });

gulp.task('default', ['build']);

function requireTask(task) {
	require('./build/tasks/' + task + '.js')(gulp, resources);
}
