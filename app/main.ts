import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {FileService} from './file/service/file.service'
import {HTTP_PROVIDERS} from 'angular2/http'

bootstrap(AppComponent, [FileService, HTTP_PROVIDERS]);
