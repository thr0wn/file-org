import {File} from '../models/file'
import {Tag} from '../models/tag'
import {Component, OnInit} from 'angular2/core'
import {RouteParams, Router} from 'angular2/router';
import {FileService} from '../service/file.service'


@Component({
	selector: 'edit-file',
	templateUrl: './app/file/edit-component/file-edit.component.html',
	styleUrls: ['./app/file/edit-component/file-edit.component.css']
})

export class FileEditComponent implements OnInit {
	constructor(private _router: Router, 
		private _fileService: FileService,
		private _routeParams: RouteParams) { }

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
			this._router.navigate(['List'])
		})
	}

	ngOnInit() {
		let id = this._routeParams.get('id')
		if (id != undefined) {
			this._fileService.getFile(id).then(file => this.file = file)
		}
	}
}