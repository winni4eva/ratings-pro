import { Injectable, Injector } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, RequestOptions, Request,RequestOptionsArgs, ConnectionBackend, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';
import {ReflectiveInjector} from '@angular/core';
import{ StorageService } from '../storage/storage.service';



@Injectable()
export class CustomHttp extends Http{

     private _storage;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
        //const injector = ReflectiveInjector.resolveAndCreate([StorageService]);
        //this._storage = injector.get([StorageService]);
    }
    
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
      return this.intercept(super.request(url, this.getRequestOptionArgs(options)));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url,this.getRequestOptionArgs(options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> { 
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }
    
    getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {

        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Authorization', 'Bearer '  +  localStorage.getItem('rToken') );
        //options.headers.append('Accept', 'application/json');
        return options;
    }

    intercept(observable: Observable<Response>): Observable<any> {
        return observable.catch((err, source) => {
            if (err.status  == 401 || err.status  == 404) {
                localStorage.removeItem('rToken');
                localStorage.removeItem('rUser');
                localStorage.removeItem('rAuth');
                window.location.href='#/login';
                //return Observable.empty();
                return Observable.throw(err);
            } else {
                return Observable.throw(err);
            }
        });

    }

}
