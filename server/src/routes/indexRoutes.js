"use strict";
var indexController_1 = require('../controllers/indexController');
var IndexRoutes = (function () {
    function IndexRoutes() {
    }
    IndexRoutes.prototype.init = function (app) {
        app.get('/', indexController_1.default.render);
    };
    return IndexRoutes;
}());
exports.indexRoutes = new IndexRoutes();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.indexRoutes;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvcm91dGVzL2luZGV4Um91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxnQ0FBNEIsZ0NBRTVCLENBQUMsQ0FGMkQ7QUFFNUQ7SUFBQTtJQUlBLENBQUM7SUFITywwQkFBSSxHQUFYLFVBQVksR0FBd0I7UUFDbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUseUJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0Ysa0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUVVLG1CQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUUzQztrQkFBZSxtQkFBVyxDQUFDIiwiZmlsZSI6InNlcnZlci9zcmMvcm91dGVzL2luZGV4Um91dGVzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
