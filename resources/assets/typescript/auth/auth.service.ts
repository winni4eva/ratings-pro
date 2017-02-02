import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  private apiAuthUrl: string = '/api/v1/';

  private isLoggedIn: boolean = false;

  redirectUrl: string;//store the URL so we can redirect after logging in

  constructor(
                private http: Http) {}


  postLogin(loginDetails): Observable<any>{

      return this.http.post( '/api/login', JSON.stringify( loginDetails ) )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  postSignUp(signUpDetails): Observable<any>{

      return this.http.post( '/api/signup', JSON.stringify( signUpDetails ))
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  getLogout() {
      
      let headers = new Headers( { 'Content-Type': 'application/json', 'Authorization': 'Bearer '  +  localStorage.getItem('auth_token') } );
      let options = new RequestOptions({ headers: headers, body: '' });
      
      return this.http.get('/api/logout/', options)
                    .map(this.extractData)
                    .catch(this.handleError);
                    //.subscribe(this.extractData, this.handleError);
  }

  private extractData(res: Response) {
      return res.json() || { };
  }

  private handleError (error: any) {
      
      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

      return Observable.throw(errMsg);

  }

}
