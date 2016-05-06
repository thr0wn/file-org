import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

import {User as UserImpl, IUser, Roles} from '../../../shared/src/models/user';
import * as Constants from '../config/constants';

export interface IUserDoc extends IUser, mongoose.Document {
	salt: string;
	provider: string;
	providerId: string;
	providerData: {[key: string]: any}
	created: Date;
	authenticate(password: string): boolean;
	hashPassword(password: string): string;
}

export interface IUserModel extends mongoose.Model<IUserDoc> {
	findByEmail(email: string): mongoose.Query<IUserDoc>
}

var userSchema = <any> new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		trim: true,
		required: 'E-mail is required',
		unique: true,
		match: [/.+\@.+/, "Please fill a valid e-mail address"]
	},
	password: {
		type: String,
		validate: [
			function(password: string) {
				return password && password.length >= 6;
			},
			'Password should be longer'
		],
		required: 'Password is required',
	},
	role: {
		type: Number,
		required: true,
		validate: function(role: Roles) {
			return typeof role !== 'undefined' && !!Roles[role];
		}
	},
	salt: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	}
});

// Instance methods
userSchema.method('authenticate', function(password: string) {
	return this.password === this.hashPassword(password);
});

userSchema.method('hashPassword', function(password: string) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
});

// Static methods
userSchema.static('findByEmail', function(email: string) {
	return this.findOne({ email: email });
});

// Mongoose middlewares
userSchema.pre('save', function(next: Function) {
	if (this.password) {
		this.salt = new
			Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

userSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

if (!userSchema.options.toObject) userSchema.options.toObject = {};
userSchema.options.toObject.transform = function(doc, ret, options) {
	delete ret.salt;
};

export var User = <IUserModel> mongoose.model<IUserDoc>(Constants.Mongoose.USER_MODEL, userSchema);

export default User;
