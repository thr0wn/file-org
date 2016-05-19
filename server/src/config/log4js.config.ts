import * as fs from 'fs';
import * as path from 'path';
import * as log4js from 'log4js';
import * as constants from '../config/constants';

const LOG_METADATA = path.parse(constants.LOG_FILE);

if (!fs.existsSync(LOG_METADATA.dir)) {
	fs.mkdirSync(LOG_METADATA.dir);
}

log4js.configure({
	appenders: [
		{
			type: 'dateFile',
			filename: constants.LOG_FILE,
			category: 'main',
			pattern: '-yyyy-MM-dd',
			alwaysIncludePattern: true
		}
	],
	replaceConsole: false
});

export const logger = log4js.getLogger('main');
export const loggerConnect = log4js.connectLogger(logger, { level: log4js.levels.DEBUG, format: ':method - :url - :status - :response-timems' });
