import * as path from 'path';
process.env.NODE_CONFIG_DIR = path.join(__dirname, '../../../build/properties');
import * as config from 'config';

// files and directories
export const SERVER_STATIC_DIR = config.get<string>('server.static.directories');
export const UPLOAD_DIR = path.join(__dirname, '../../files');
export const LOG_FILE = path.join(__dirname, '../../logs/main.log');
export const SESSION_SECRET = 'lHCBrJg6zlTluLLPaObMcEZMcqDt6LCAamG1ByOWcN1cjAKsL0iULKpGA6PqPXV';
export const SERVER_PORT = config.get<string>('server.port');

// database
export const DATABASE_URI = config.get<string>('db.uri');