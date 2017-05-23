import {Injectable} from '@angular/core';
import {Http , Headers , RequestOptions} from '@angular/http';

import { Angular2RestServiceValidators } from './angular2-rest-service.validators';

@Injectable()
export class Angular2RestServiceSettings {

    private baseUrl : string;
    headers: Headers;
    options: RequestOptions;
    private validators : Angular2RestServiceValidators;
    public params : string[] = [];

    constructor(private http : Http){
        this.headers = new Headers();
        this.validators = new Angular2RestServiceValidators();
    }

    setBaseUrl(base : string) {
        //if(this.validators.isValidURL(base)){
            if(base[base.length-1]=='/'){
                base = base.substring(0,base.length-1);
            }
            this.baseUrl = base;
        //}else{
          //  console.log("Invalid Base Url specified!");
       // }
    }

    getBaseUrl() : string {
        //validate
        return this.baseUrl;
    }

    addHttpHeader(name : string, value : string){
        if(name != undefined && value != undefined){
            this.headers.set(name, value);
        }
    }

    removeHttpHeader(name : string){
        if(name != undefined){
            if(this.headers.has(name)){
                this.headers.delete(name);
            }
        }
    }

    
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

}