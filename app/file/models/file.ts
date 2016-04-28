import {Tag} from './tag.ts';

export class File{
	id: number;
	name: string;
	desc: string;
	path: string;
	tags: Array<Tag>;
}