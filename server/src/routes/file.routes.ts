import * as express from 'express';

import {FileController} from '../controllers/file.controller';

export class FileRoutes {
	constructor(app: express.Application) {
		var controller = new FileController();
		app.route('/files')
			.post(controller.create);
	}
}