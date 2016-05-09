import * as path from 'path';

// files and directories
export let STATIC_SERVER_DIR = path.join(__dirname, '../../../dist');
export let UPLOAD_DIR = path.join(__dirname, '../../files');
export let LOG_FILE = path.join(__dirname, '../../logs/main.log');
export let SESSION_SECRET = 'lHCBrJg6zlTluLLPaObMcEZMcqDt6LCAamG1ByOWcN1cjAKsL0iULKpGA6PqPXV';
export let SERVER_PORT = process.env.SERVER_PORT;

// database
export let DATABASE_URI = process.env.DATABASE_URI;