import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';

import { Angular2RestServiceSettings } from './angular2-rest-service.settings';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Angular2RestServiceHttp {

    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http, private settings: Angular2RestServiceSettings) { }

    request(method: string, url: string, _headers: Headers, data?: any): any {

        this.headers = _headers;
        this.parseHeaders();

        if (method == "DELETE") {

            return this.httpDelete(url);

        } else if (method == "PUT") {
            //update a record on server
            //input : Json object

            return this.httpPut(url, JSON.stringify(data));

        } else if (method == "POST") {

            return this.httpPost(url, JSON.stringify(data));

        } else if (method == "PATCH") {

            return this.httpPatch(url, JSON.stringify(data));

        } else {
            return this.httpGet(url);

        }

    }

    httpGet(url: string): Observable<any> {

        this.headers.set('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: this.headers });

        return this.http.get(url, this.options)
            .map((response: any) => {
                return response;
            })
            .catch(error => {
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                console.error(errMsg);
                return Observable.throw(errMsg);
            });
    }

    httpDelete(url: string): Observable<any> {

        this.headers.set('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: this.headers });

        return this.http.delete(url, this.options)
            .map((response: any) => {
                return response;
            })
            .catch(error => {
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                console.error(errMsg);
                return Observable.throw(errMsg);
            });
    }

    httpPut(url: string, data: string): Observable<any> {

        this.headers.set('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: this.headers });

        return this.http.put(url, data, this.options)
            .map((response: any) => {
                return response;
            })
            .catch(error => {
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                console.error(errMsg);
                return Observable.throw(errMsg);
            });
    }

    httpPost(url: string, data: string): Observable<any> {

        this.headers.set('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: this.headers });

        return this.http.post(url, data, this.options)
            .map((response: any) => {
                return response;
            })
            .catch(error => {
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                console.error(errMsg);
                return Observable.throw(errMsg);
            });
    }

    httpPatch(url: string, data: string): Observable<any> {

        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });

        return this.http.patch(url, data, this.options)
            .map((response: any) => {
                return response;
            })
            .catch(error => {
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                console.error(errMsg);
                return Observable.throw(errMsg);
            });
    }

    parseHeaders() {
        let headerKeys: string[] = this.settings.headers.keys();
        if(this.headers == undefined){
            this.headers = new Headers();
        }
        for (let i = 0; i < headerKeys.length; i++) {
            if (!this.headers.has(headerKeys[i])) {
                this.headers.set(headerKeys[i], this.settings.headers.get(headerKeys[i]));
            }
        }

    }

}