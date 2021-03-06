import * as mongoose from 'mongoose';

export interface ITag {
	id: string;
	name: string;
}

export interface ITagDoc extends ITag, mongoose.Document {
	id: string;
}

export interface ITagModel extends mongoose.Model<ITagDoc> {
}

const tagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
});

tagSchema.set('toJSON', { getters: true, virtuals: true });

export const Tag = <ITagModel>mongoose.model<ITagDoc>('Tag', tagSchema, 'tags');