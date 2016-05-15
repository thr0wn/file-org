import * as express from 'express';
import {TagController} from '../controllers/tag.controller';

export class TagRoutes {
	constructor(app: express.Application) {
		var controller = new TagController();
		app.route('/tags')
			.get(controller.list)
			.post(controller.create);
	}
}