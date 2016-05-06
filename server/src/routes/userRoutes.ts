import * as express from 'express';

import userController from '../controllers/userController'

class UserRoutes {
	public init(app: express.Application) {
		app.route('/services/users')
			.post(userController.create)
			.get(userController.list);

		app.route('/services/users/:userId')
			.get(userController.read)
			.post(userController.update)
			.delete(userController.remove);

		app.param('userId', userController.findUserById);
	}
}

export var userRoutes = new UserRoutes();

export default userRoutes;
