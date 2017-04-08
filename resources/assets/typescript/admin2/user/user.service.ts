import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { StorageService } from '../../shared/storage/storage.service'; 

@Injectable()
export class UserService {
  
  private _apiUsersUrl = '/api/v1/users';

  constructor(
                private http: Http,
                private _storage: StorageService) {}

  
  getUsers(userId = 0): Observable<any>{
      return this.http.get( this._apiUsersUrl + `?resource=users&id=${userId}` )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  //removeUser(userId): {//Observable<any>{
    //   return this.http.delete( this._apiResponseUrl +'/'+ responseId )
    //                   .map(this.extractData)
    //                   .catch(this.handleError);
      
  //}

  addUser(user, userId=0): Observable<any>{
      return this.http.post( this._apiUsersUrl + `?id=${userId}`, JSON.stringify( user ) )
                      .map(this.extractData)
                      .catch(this.handleError);
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
