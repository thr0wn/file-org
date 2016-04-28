import {File} from '../models/file'
import {Tag} from '../models/tag'
import {Component,OnInit} from 'angular2/core'
import {FileService} from '../service/file.service'


@Component({
	selector: 'file-list',
	templateUrl: './app/file/list-component/file-list.component.html',
	styleUrls: ['./app/file/list-component/file-list.component.css'],
	providers: [FileService]
})

export class FileListComponent implements OnInit{
	constructor(private _fileService: FileService) { }
	
	files: Array<File>

	getFiles(){
		this._fileService.getFiles().then(files => this.files = files)
	}

	ngOnInit(){
		this.getFiles()
	}

	showDetail(file){
		file.show = !file.show
	}
}