import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as constants from '../config/constants';
import {logger, loggerConnect} from './log4js.config';
import {FileRoutes} from '../routes/file.routes';
import {TagRoutes} from '../routes/tag.routes';

export function newApp(): express.Application {
	const app = express();

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
	new TagRoutes(app);

	// static directories
	const dirs = constants.SERVER_STATIC_DIR.split(',');
	dirs.forEach((dir) => {
		const absDir = path.join(__dirname, '../../..', dir);
		app.use(express.static(absDir));
	})

	// error handler
	app.use(<ErrorRequestHandler>(err, req, res, next) => {
		logger.error(err.stack);
		if (process.env.NODE_ENV === 'development') {
			// will print stacktrace
			next(err);
		} else {
			// no stacktraces leaked to user
			res.status(err.status || 500).send(err.message).send();
		}
	});

	return app;
};