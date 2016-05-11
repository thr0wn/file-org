var q = require('q');
var child_process = require('child_process');
var path = require('path');

var exec = q.nbind(child_process.exec, child_process);
var rootDir = path.join(__dirname, '../..');

module.exports = function (gulp) {
	gulp.task('postinstall', function (cb) {
		q.all([
			exec('typings install', { cwd: path.join(rootDir, 'app') }),
			exec('typings install', { cwd: path.join(rootDir, 'server') }),
			exec('bower install', { cwd: rootDir })
		])
		.nodeify(cb);
	});
};