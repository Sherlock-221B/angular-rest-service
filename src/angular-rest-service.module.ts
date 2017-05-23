import {NgModule} from '@angular/core';
import {HttpModule } from '@angular/http';

import {AngularRestService} from './angular-rest.service';
import {AngularRestServiceHttp} from './angular-rest-service.http';
import { AngularRestServiceSettings }from './angular-rest-service.settings';
//import {AngularRestService} from './angular-rest.service';

export function AngularRestServiceFactory(AngularRestApiHttp, AngularRestApiSettings) {
    return (AngularRestApiHttp, AngularRestApiSettings) => {
                new AngularRestService(AngularRestApiHttp ,AngularRestApiSettings)
        }
}


@NgModule({
    imports : [HttpModule],
    providers: [AngularRestService, 
                AngularRestServiceHttp, 
                AngularRestServiceSettings
    // ,
    // {
    //     provide : AngularRestApi,
    //     useFactory : Angular2RestServiceFactory(Angular2RestApiHttp, Angular2RestApiSettings),
    //     deps : [Angular2RestApiSettings, Angular2RestApiHttp]
    // }
    
    ]
})

export class AngularRestServiceModule {}