import * as express from 'express';

import indexController from '../controllers/indexController'

class IndexRoutes {
	public init(app: express.Application) {
		app.get('/', indexController.render);
	}
}

export var indexRoutes = new IndexRoutes();

export default indexRoutes;