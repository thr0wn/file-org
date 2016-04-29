import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {FileListComponent} from './file/list-component/file-list.component';
import {FileEditComponent} from './file/edit-component/file-edit.component';

@Component({
    selector: 'my-app',
    template: `
    <div class="body">
    	<div class="nav">
	    <a [routerLink]="['List']">Home</a>
	    <a [routerLink]="['Create']">Create</a>
	    </div>
	    <router-outlet></router-outlet>
    </div>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
	{
		path: '/list',
		name: 'List',
		component: FileListComponent,
		useAsDefault: true
	},
	{
		path: '/create',
		name: 'Create',
		component: FileEditComponent
	},
	{
		path: '/edit/:id',
		name: 'Edit',
		component: FileEditComponent
	}
])

export class AppComponent {
}
