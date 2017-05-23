# angular2-rest-service

## Installation

To install this library, run:

```bash
$ npm install angular2-rest-service --save
```

## How to use


Make these changes in your root module `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import
import { Angular2RestServiceModule, Angular2RestService,
Angular2RestServiceSettings} from 'angular2-rest-service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //add to imports array
    Angular2RestServiceModule
  ],
  //add to providers array
  providers: [Angular2RestService, Angular2RestServiceSettings],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In the main component, set the base URL:

```typescript
import { Component, OnInit } from ’@angular/core’; 
import { Angular2RestServiceSettings } from ’angular2-rest-service’;
@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  })
  
  export class AppComponent implements OnInit { 
    
    constructor( private settings: Angular2RestServiceSettings) { } 
    
    ngOnInit() { 
      this.settings.setBaseUrl("http://base/url/api");
    }
}

```

Example :
From any component, do this:

```typescript
import { Component, OnInit } from ’@angular/core’; 
import { Angular2RestService } from ’angular2-rest-service’;
@Component({ 
  selector: 'my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.css']
  })
  
export class MyAppComponent implements OnInit { 
    userList ;
    constructor(private rest : Angular2RestService) { } 
    
    ngOnInit() { 

      //makes a GET request to http://base/url/api/users/
      this.rest.list("users").doGet().subscribe(
        result =>{
          this.userList = result.json();
          //do other stuff
        }
      );
    }
}

```




## License

MIT © [Vijay Jadhav](mailto:vijayjadhav008@gmail.com)
