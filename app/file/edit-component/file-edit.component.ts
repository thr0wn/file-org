import {File} from '../models/file'
import {Tag} from '../models/tag'
import {Component, OnInit} from 'angular2/core'
import {FileService} from '../service/file.service'


@Component({
	selector: 'edit-file',
	templateUrl: './app/file/edit-component/file-edit.component.html',
	styleUrls: ['./app/file/edit-component/file-edit.component.css'],
	providers: [FileService]
})

export class FileEditComponent {
	constructor(private _fileService: FileService) { }

	tag: string = ''

	file: File = {
		name: '',
		desc: '',
		tags: [],
		path: '',
		id: undefined
	}

	addTag() {
		if (this.tag != '') {
			this.file.tags.unshift({ id: undefined, name: this.tag })
			this.tag = ''
		}
	}

	save() {
		this._fileService.save(this.file).then(result => {
			console.log(result);
		})
	}
}