var q = require('q');
var child_process = require('child_process');
var path = require('path');

var execSync = q.nbind(child_process.execSync, child_process);
var rootDir = path.join(__dirname, '../..');

module.exports = function (gulp) {
	gulp.task('postinstall', function (cb) {
		q.all([
			execSync('typings install', { cwd: path.join(rootDir, 'app') }),
			execSync('typings install', { cwd: path.join(rootDir, 'server') }),
			execSync('bower install', { cwd: rootDir })
		])
		.finally(cb);
	});
};