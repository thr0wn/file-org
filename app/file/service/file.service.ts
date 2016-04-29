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
		name: 'Pedro Ferreira',
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

	files: Array<File> = [this.file1, this.file2]

	currentFileId = 3

	getFiles() {
		return Promise.resolve(this.files)
	}

	getFile(id) {
		return Promise.resolve(this.files.filter(function(file) { return file.id == id })[0])
	}

	save(file: File) {
		if(file.id == undefined){
			file.id = this.currentFileId
			this.currentFileId = this.currentFileId + 1
			this.files.unshift(file)	
		}else{

		}
		return Promise.resolve(1)
	}
}