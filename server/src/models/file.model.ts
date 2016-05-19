import * as mongoose from 'mongoose';
import {ITag} from './tag.model';
import * as constants from '../config/constants';

export interface IFile {
	id: string;
	name: string;
	desc: string;
	path: string;
	tags: ITag[]|string[];
}

export interface IFileDoc extends IFile, mongoose.Document {
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

fileSchema.set('toJSON', { getters: true, virtuals: true });

export const File = <IFileModel>mongoose.model<IFileDoc>('File', fileSchema, 'files');
