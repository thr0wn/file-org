import * as express from 'express';

import loginController from '../controllers/loginController'

class LoginRoutes {
	public init(app: express.Application) {
		app.use('/services', loginController.loginFilter);
		app.route('/login')
			.post(loginController.login)
			.get(loginController.redirect);
		app.get('/logout', loginController.logout);
	}
}

export var loginRoutes = new LoginRoutes();

export default loginRoutes;
