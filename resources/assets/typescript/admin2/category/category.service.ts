import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { StorageService } from '../../shared/storage/storage.service'; 

@Injectable()
export class CategoryService {
  
  private _apiUrl = '/api/v1/categories';

  constructor(
                private http: Http,
                private _storage: StorageService) {}

  
  getCategories(): Observable<any>{
      return this.http.get( this._apiUrl )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  addCategory(category): Observable<any>{
      
      return this.http.post( this._apiUrl, JSON.stringify( category ) )
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
