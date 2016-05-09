import * as dotenv from 'dotenv';
import * as path from 'path';

// choose the correct properties before anything
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
dotenv.config({path: path.join(__dirname, '../../../build/${env}.properties')});