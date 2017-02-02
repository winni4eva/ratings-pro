import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { StorageService } from '../shared/storage/storage.service'; 

@Injectable()
export class HomeService{
  
  private _apiUrl = '/api/v1/ratings';

  private _userApiUrl = '/api/v1/users';

  constructor(
                private http: Http,
                private _storage: StorageService) {}
  
  addRating(rating): Observable<any>{
      
      return this.http.post( this._apiUrl, JSON.stringify( rating ) )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  getUserSurveys(): Observable<any>{
      
      return this.http.get( this._userApiUrl + `?resource=surveys` )
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
