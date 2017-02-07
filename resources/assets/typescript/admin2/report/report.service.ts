import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { StorageService } from '../../shared/storage/storage.service'; 

@Injectable()
export class ReportService {
  
  private _apiReportUrl = '/api/v1/reports';

  constructor(
                private http: Http,
                private _storage: StorageService) {}

  
  getReport(filter): Observable<any>{
      return this.http.get( this._apiReportUrl + `?from=${filter[0].from}&to=${filter[0].to}&tab=${filter[0].tab}&branchId=${filter[0].branchId}` )
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
