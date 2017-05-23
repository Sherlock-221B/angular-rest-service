# angular-rest-service

## Installation

To install this library, run:

```bash
$ npm install angular-rest-service --save
```

## How to use


Make these changes in your root module `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import
import { AngularRestServiceModule, AngularRestService,
AngularRestServiceSettings} from 'angular-rest-service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //add to imports array
    AngularRestServiceModule
  ],
  //add to providers array
  providers: [AngularRestService, AngularRestServiceSettings],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In the main component, set the base URL:

```typescript
import { Component, OnInit } from ’@angular/core’; 
import { AngularRestServiceSettings } from ’angular-rest-service’;
@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  })
  
  export class AppComponent implements OnInit { 
    
    constructor( private settings: AngularRestServiceSettings) { } 
    
    ngOnInit() { 
      this.settings.setBaseUrl("http://base/url/api");
    }
}

```

Example :
From any component, do this:

```typescript
import { Component, OnInit } from ’@angular/core’; 
import { AngularRestService } from ’angular-rest-service’;
@Component({ 
  selector: 'my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.css']
  })
  
export class MyAppComponent implements OnInit { 
    userList ;
    constructor(private rest : AngularRestService) { } 
    
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
