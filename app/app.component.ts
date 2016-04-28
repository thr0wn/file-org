import {Component} from 'angular2/core';
import {FileListComponent} from './file/list-component/file-list.component';


@Component({
    selector: 'my-app',
    template: `
	
    <file-list></file-list>`,
    directives: [FileListComponent]
})
export class AppComponent {

}
