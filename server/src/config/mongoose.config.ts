import * as mongoose from 'mongoose';
import * as constants from './constants';

export function newConnection() {
    var db = mongoose.connect(constants.DATABASE_URI, { server: { reconnectTries: Number.MAX_VALUE } });
    return db;
}