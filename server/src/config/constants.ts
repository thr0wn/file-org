import * as path from 'path';
import * as config from 'config';

// files and directories
export let STATIC_SERVER_DIR = path.join(__dirname, '../../../dist');
export let UPLOAD_DIR = path.join(__dirname, '../../files');
export let LOG_FILE = path.join(__dirname, '../../logs/main.log');
export let SESSION_SECRET = 'lHCBrJg6zlTluLLPaObMcEZMcqDt6LCAamG1ByOWcN1cjAKsL0iULKpGA6PqPXV';
export let SERVER_PORT = config.get('server.port');

// database
export let DATABASE_URI = config.get('db.uri');