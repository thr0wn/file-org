import './src/config/log4jsConfig';
import MongooseConfig from './src/config/mongooseConfig';
import ExpressConfig from './src/config/expressConfig';
import PassportConfig from './src/config/passportConfig';
import * as Constants from './src/config/constants';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var db = MongooseConfig.newConnection();
var server = ExpressConfig.newApp();
var passport = PassportConfig.init();

server.listen(Constants.SERVER_PORT);

console.log('Server running at http://localhost:' + Constants.SERVER_PORT + '/');