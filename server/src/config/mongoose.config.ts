import * as mongoose from 'mongoose';
import * as constants from './constants';

export function newConnection() {
	mongoose.Promise = require('q').Promise;
	const db = mongoose.connect(
		constants.DATABASE_URI,
		{ server: { reconnectTries: Number.MAX_VALUE } },
		(err) => {
			if (err) {
				console.error('Mongodb/Mongoose connect error. Terminating...');
				process.exit();
			}
		});
	return db;
}