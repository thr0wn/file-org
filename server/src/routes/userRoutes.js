"use strict";
var userController_1 = require('../controllers/userController');
var UserRoutes = (function () {
    function UserRoutes() {
    }
    UserRoutes.prototype.init = function (app) {
        app.route('/services/users')
            .post(userController_1.default.create)
            .get(userController_1.default.list);
        app.route('/services/users/:userId')
            .get(userController_1.default.read)
            .post(userController_1.default.update)
            .delete(userController_1.default.remove);
        app.param('userId', userController_1.default.findUserById);
    };
    return UserRoutes;
}());
exports.userRoutes = new UserRoutes();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.userRoutes;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvcm91dGVzL3VzZXJSb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLCtCQUEyQiwrQkFFM0IsQ0FBQyxDQUZ5RDtBQUUxRDtJQUFBO0lBYUEsQ0FBQztJQVpPLHlCQUFJLEdBQVgsVUFBWSxHQUF3QjtRQUNuQyxHQUFHLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO2FBQzFCLElBQUksQ0FBQyx3QkFBYyxDQUFDLE1BQU0sQ0FBQzthQUMzQixHQUFHLENBQUMsd0JBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQixHQUFHLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDO2FBQ2xDLEdBQUcsQ0FBQyx3QkFBYyxDQUFDLElBQUksQ0FBQzthQUN4QixJQUFJLENBQUMsd0JBQWMsQ0FBQyxNQUFNLENBQUM7YUFDM0IsTUFBTSxDQUFDLHdCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFaEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsd0JBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0YsaUJBQUM7QUFBRCxDQWJBLEFBYUMsSUFBQTtBQUVVLGtCQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztBQUV6QztrQkFBZSxrQkFBVSxDQUFDIiwiZmlsZSI6InNlcnZlci9zcmMvcm91dGVzL3VzZXJSb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
