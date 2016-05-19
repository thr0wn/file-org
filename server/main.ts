import * as mongooseConfig from './src/config/mongoose.config';
import * as expressConfig from './src/config/express.config';
import * as constants from './src/config/constants';

const db = mongooseConfig.newConnection();
const app = expressConfig.newApp();

app.listen(constants.SERVER_PORT);

console.info('Server running at http://localhost:' + constants.SERVER_PORT + '/');