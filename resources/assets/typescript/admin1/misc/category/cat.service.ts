import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CategoryService {

  private apiCatUrl: string = '/api/v1/categories';

  constructor(private http: Http) {}


  postCategory(catDetails): Observable<any>{
      console.log("making a request");
      return this.http.post( this.apiCatUrl, JSON.stringify( catDetails ) )
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
