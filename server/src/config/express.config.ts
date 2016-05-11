import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as constants from '../config/constants';
import {loggerConnect} from './log4js.config';
import {FileRoutes} from '../routes/file.routes';

export function newApp(): express.Application {
	var app = express();

	// middlewares
	if (process.env.NODE_ENV === 'production') {
		app.use(compression());
	}
	app.use(loggerConnect);
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	// routes
	new FileRoutes(app);

	// static files
	app.use(express.static(constants.SERVER_STATIC_DIR));

	return app;
};