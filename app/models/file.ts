import {Tag} from './tag.ts';

export class File{
	id: number;
	desc: string;
	path: string;
	tags: Array<Tag>;
}