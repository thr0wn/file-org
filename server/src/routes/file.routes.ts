import * as express from 'express';
import {FileController} from '../controllers/file.controller';

export class FileRoutes {
	constructor(app: express.Application) {
		const controller = new FileController();
		app.route('/files')
			.get(controller.list)
			.post(controller.create);
	}
}