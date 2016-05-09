import * as mongoose from 'mongoose';
import {Tag} from './tag.model';
import * as constants from '../config/constants';

export class File {
	id: string;
	name: string;
	desc: string;
	path: string;
	tags: Tag[]|string = [];
}

export interface IFileDoc extends File, mongoose.Document {
	id: string;
}

export interface IFileModel extends mongoose.Model<IFileDoc> {
}

var fileSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	desc: String,
	path: {
		type: String,
		required: true
	},
	tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
});

export var FileModel = <IFileModel>mongoose.model<IFileDoc>('File', fileSchema, 'files');
