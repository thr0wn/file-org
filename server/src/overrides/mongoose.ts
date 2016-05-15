declare module 'mongoose' {
	import * as q from 'q';
	export interface Document {
		save<T>(callback?: (err: any, res: T) => void): q.Promise<T>;
	}
	export interface Promise<T> extends q.Promise<T> {
	}
}