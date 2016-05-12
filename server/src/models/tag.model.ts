import * as mongoose from 'mongoose';

export class Tag {
	id: string;
	name: string;
}

export interface ITagDoc extends Tag, mongoose.Document {
	id: string;
}

export interface ITagModel extends mongoose.Model<ITagDoc> {
}

var tagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
});

export var TagModel = <ITagModel>mongoose.model<ITagDoc>('Tag', tagSchema, 'tags');