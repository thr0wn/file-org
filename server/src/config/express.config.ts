import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import * as constants from '../config/constants';
import {loggerConnect} from './log4js.config';
import loginRoutes from '../routes/loginRoutes';
import indexRoutes from '../routes/indexRoutes';
import userRoutes from '../routes/userRoutes';

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
	loginRoutes.init(app);
	indexRoutes.init(app);
	userRoutes.init(app);

	// static files
	app.use(express.static(constants.STATIC_DIR));

	return app;
}