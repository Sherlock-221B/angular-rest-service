import {NgModule} from '@angular/core';
import {HttpModule } from '@angular/http';

import {Angular2RestService} from './angular2-rest.service';
import {Angular2RestServiceHttp} from './angular2-rest-service.http';
import { Angular2RestServiceSettings }from './angular2-rest-service.settings';
//import {Angular2RestService} from './angular2-rest.service';

export function Angular2RestServiceFactory(Angular2RestApiHttp, Angular2RestApiSettings) {
    return (Angular2RestApiHttp, Angular2RestApiSettings) => {
                new Angular2RestService(Angular2RestApiHttp ,Angular2RestApiSettings)
        }
}


@NgModule({
    imports : [HttpModule],
    providers: [Angular2RestService, 
                Angular2RestServiceHttp, 
                Angular2RestServiceSettings
    // ,
    // {
    //     provide : Angular2RestApi,
    //     useFactory : Angular2RestServiceFactory(Angular2RestApiHttp, Angular2RestApiSettings),
    //     deps : [Angular2RestApiSettings, Angular2RestApiHttp]
    // }
    
    ]
})

export class Angular2RestServiceModule {}