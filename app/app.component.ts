import {Component} from 'angular2/core';
import {FileListComponent} from './file/list-component/file-list.component';
import {FileEditComponent} from './file/edit-component/file-edit.component';

@Component({
    selector: 'my-app',
    template: `
	<edit-file></edit-file>
    <file-list></file-list>`,
    directives: [FileEditComponent,FileListComponent]
})
export class AppComponent {

}
