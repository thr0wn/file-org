import {File} from '../models/file.ts'
import {Tag} from '../models/tag.ts'
import {Injectable, EventEmitter} from 'angular2/core'

@Injectable()
export class FileService {
	tags: Array<Tag> = [{
		id: 1,
		name: "CV"
	}, {
			id: 2,
			name: "java"
		}
	]
	file1: File = {
		id: 1,
		name:'Pedro Ferreira',
		desc: "Cv do pedro ferreira.",
		path: "/file1",
		tags: this.tags,
	}

	file2: File = {
		id: 1,
		name: 'Nathan Camargos',
		desc: "Cv do nathan camargos.",
		path: "/file2",
		tags: this.tags,
	}

	files:Array<File> = [this.file1, this.file2]

	getFiles() {
		return Promise.resolve(this.files)
	}

	save(file:File){
		this.files.unshift(file)
		return Promise.resolve(1)
	}
}