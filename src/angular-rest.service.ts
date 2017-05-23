import { Observable } from 'RxJS/Observable';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { AngularRestServiceHttp } from './angular-rest-service.http';
import { AngularRestServiceSettings } from './angular-rest-service.settings';

@Injectable()
export class AngularRestService {

    private url_tokens: string[] = [];
    private params : string[] = [];
    public path: string;
    private copy: string;
    private customBaseUrl : string;
    headers : Headers;

    constructor(private restHttp: AngularRestServiceHttp,
        private settings: AngularRestServiceSettings
    ) { 
    }

    // //1
    // one(name: string, id: number, params?: any): any {
    //     //validation incomplete
    //     this.url_tokens.push(name);
    //     this.url_tokens.push(id.toString());
    //     if (params != undefined) {
    //         for (var key in params) {
    //             if (params.hasOwnProperty(key)) {
    //                 this.setParameter(key, params[key]);
    //             }
    //         }
    //     }
    //     if (this.copy != undefined && this.copy == "y") {
    //         return this;
    //     } else {
    //         let newCopy = this.makeCopy(this);
    //         this.cleanup();
    //         return newCopy;
    //     }
    // }

    //2
    list(name: string, params?: any): any {
        this.url_tokens.push(name);
        if (params != undefined) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    this.setParameter(key, params[key]);
                }
            }
        }
        
        if (this.copy != undefined && this.copy == "y") {
           //console.log("List() done! no make copy");
            return <AngularRestService> this;
        } else {
            let newCopy = this.makeCopy(this);
            this.cleanup();
            //console.log("List() done! make copy");
            return <AngularRestService> newCopy;
        }
        
    }

    //3
    filterById(params?: any): any {

        if (params != undefined) {
            if(Object.prototype.toString.call(params) === '[object Array]'){
                if(params.length > 0){
                    for(let i=0; i< params.length ; i++){
                        this.url_tokens.push(params[i].toString());
                    }
                }
            }else{
                this.url_tokens.push(params.toString());
            }
        }
        return <AngularRestService> this;
    }


    //14
    // oneWithUrl(url : string, name: string, id: number, params?: any): any {
    //     //validation incomplete
    //     this.url_tokens.push(name);
    //     this.url_tokens.push(id.toString());
    //     if (params != undefined) {
    //         for (var key in params) {
    //             if (params.hasOwnProperty(key)) {
    //                 this.setParameter(key, params[key]);
    //             }
    //         }
    //     }
    //     if (this.copy != undefined && this.copy == "y") {
    //         return this;
    //     } else {
    //         let newCopy = this.makeCopy(this);
    //         newCopy.copy = "y";
    //         newCopy.customBaseUrl = url;
    //         this.cleanup();
    //         return newCopy;
    //     }
    // }

    //15
    listWithBaseUrl(url : string, name: string, params?: any): any {
        //validation incomplete
        this.url_tokens.push(name);
        if (params != undefined) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    this.setParameter(key, params[key]);
                }
            }
        }
        if (this.copy != undefined && this.copy == "y") {
            return <AngularRestService> this;
        } else {
            let newCopy = this.makeCopy(this);
            newCopy.copy = "y";
            newCopy.customBaseUrl = url;
            this.cleanup();
            return <AngularRestService> newCopy;
        }
    }


    //4
    makeCopy(oldCopy: AngularRestService) {
        if (oldCopy == undefined) return <AngularRestService> oldCopy;
        let newCopy : AngularRestService= Object.assign({}, oldCopy);
        //newCopy.one = oldCopy.one; //1
        newCopy.list = oldCopy.list; //2
        newCopy.filterById = oldCopy.filterById; //3
        newCopy.makeCopy = oldCopy.makeCopy; //4
        newCopy.cleanup = oldCopy.cleanup; //5
        newCopy.doGet = oldCopy.doGet; //6
        newCopy.doPost = oldCopy.doPost; //7
        newCopy.doPut = oldCopy.doPut; //8
        newCopy.doDelete = oldCopy.doDelete; //9
        newCopy.constructPath = oldCopy.constructPath; //11
        newCopy.setParameter = oldCopy.setParameter; //12
        newCopy.doPatch = oldCopy.doPatch; //13
        //newCopy.oneWithUrl = oldCopy.oneWithUrl; //14
        newCopy.listWithBaseUrl = oldCopy.listWithBaseUrl; //15
        newCopy.addHttpHeader = oldCopy.addHttpHeader; //16
        newCopy.removeHttpHeader = oldCopy.removeHttpHeader; //17
        return <AngularRestService> newCopy;
    }

    //5
    cleanup() {
        this.url_tokens = [];
        if (this.params != undefined) {
            for (var key in this.params) {
                delete this.params[key];
            }
        }
        this.path = undefined;
        this.copy = undefined;
        this.customBaseUrl = undefined;
        this.headers = undefined;
    }

    //6
    doGet(): Observable<any> {
        this.path = this.constructPath();
        return this.restHttp.request("GET", this.path, this.headers);
    }

    //7
    doPost(data: string): Observable<any> {
        this.path = this.constructPath();
        return this.restHttp.request("POST", this.path, this.headers ,data);
    }

    //8
    doPut(data: string): Observable<any> {
        this.path = this.constructPath();
        return this.restHttp.request("PUT", this.path,  this.headers, data);
    }

    //9
    doDelete(): Observable<any> {
        this.path = this.constructPath();
        return this.restHttp.request("DELETE", this.path, this.headers);
    }

    //13
    doPatch(data : string): Observable<any> {
        this.path = this.constructPath();
        return this.restHttp.request("PATCH", this.path, this.headers, data);
    }


    //11
    constructPath(): string {
        
        let url : string = "";
        let paramList :string[] = [];
        let count = 0;
        if(this.customBaseUrl != undefined){
            url = this.customBaseUrl;
            console.log("Custom Base Url Used.");
        }else{
            url = this.settings.getBaseUrl();
        }
        //tokens
        for (let i = 0; i < this.url_tokens.length; i++) {
            url += "/";
            url += this.url_tokens[i];
        }
        //parameters
        if (this.params != undefined) {
            for (var key in this.params) {
                if (this.params.hasOwnProperty(key)) {
                    if (count == 0) {
                        url += "?";
                    } else {
                        url += "&";
                    }
                    url += key + "=";
                    url += this.params[key].toString();
                    paramList.push(key);
                    count += 1;
                }
            }
        }
        //global parameters
        if (this.settings.params != undefined) {
            for (var key in this.settings.params) {
                if (this.settings.params.hasOwnProperty(key)
                    && paramList.indexOf(key) < 0
                ) {
                    if (count == 0) {
                        url += "?";
                    } else {
                        url += "&";
                    }
                    url += key + "=";
                    url += this.settings.params[key].toString();
                    count += 1;
                }
            }
        }


        //convert the constructed url string into a valid URI
        url = encodeURI(url);
        console.log("URL : " + url);
        return url;
    }

    //12
    setParameter(name : string, value : any){
        if(name != undefined && value != undefined){
            if(Object.prototype.toString.call(value) === '[object Array]'){
                if(value.length > 0){
                    let result : string = value[0].toString();
                    for(let i=1; i< value.length ; i++){
                        result += "," + value[i].toString();
                    }
                    this.params[name] = result;
                }
            }else{
                this.params[name] = value.toString();
            }
        }
    }


    //16
    addHttpHeader(name : string, value : string){
        if(name != undefined && value != undefined){
            if(this.headers == undefined){
                this.headers = new Headers();
            }
            this.headers.set(name, value);
        }
    }

    //17
    removeHttpHeader(name : string ){
        if(name != undefined && this.headers != undefined){
            if(this.headers.has(name)){
                this.headers.delete(name);
            }
        }
    }

}


