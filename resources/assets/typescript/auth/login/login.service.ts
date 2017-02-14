import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { StorageService } from '../../shared/storage/storage.service'; 

@Injectable()
export class LoginService {

  private _isLoggedIn: boolean = false;

  redirectUrl: string;//store the URL so we can redirect after logging in

  constructor(
                private http: Http,
                private _storage: StorageService) {}


  postLogin(loginDetails): Observable<any>{

      return this.http.post( '/api/login', JSON.stringify( loginDetails ) )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  getLogout() {
      
      return this.http.get('/api/logout/')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  setAuthDetails(data){
      this._storage.set('rToken', data.token);
      this._storage.set('rUser', JSON.stringify(data.user));
      this._storage.set('rAuth', true);
  }

  cleanAuthDetails(){
      this._storage.remove('rToken');
      this._storage.remove('rUser');
      this._storage.remove('rAuth');
  }

  getIsLoggedIn(){
      return !!this._storage.get('rAuth');
  }

  private extractData(res: Response) {
      return res.json() || { };
  }

  private handleError (error: any) {
      if( JSON.parse(error._body).message ) return Observable.throw(JSON.parse(error._body).message);

      let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

      return Observable.throw(errMsg);

  }

}
