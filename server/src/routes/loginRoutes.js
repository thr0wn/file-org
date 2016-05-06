"use strict";
var loginController_1 = require('../controllers/loginController');
var LoginRoutes = (function () {
    function LoginRoutes() {
    }
    LoginRoutes.prototype.init = function (app) {
        app.use('/services', loginController_1.default.loginFilter);
        app.route('/login')
            .post(loginController_1.default.login)
            .get(loginController_1.default.redirect);
        app.get('/logout', loginController_1.default.logout);
    };
    return LoginRoutes;
}());
exports.loginRoutes = new LoginRoutes();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.loginRoutes;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvcm91dGVzL2xvZ2luUm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxnQ0FBNEIsZ0NBRTVCLENBQUMsQ0FGMkQ7QUFFNUQ7SUFBQTtJQVFBLENBQUM7SUFQTywwQkFBSSxHQUFYLFVBQVksR0FBd0I7UUFDbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUseUJBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRCxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNqQixJQUFJLENBQUMseUJBQWUsQ0FBQyxLQUFLLENBQUM7YUFDM0IsR0FBRyxDQUFDLHlCQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUseUJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0Ysa0JBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQUVVLG1CQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUUzQztrQkFBZSxtQkFBVyxDQUFDIiwiZmlsZSI6InNlcnZlci9zcmMvcm91dGVzL2xvZ2luUm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
