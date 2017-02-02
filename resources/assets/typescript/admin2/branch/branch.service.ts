import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { StorageService } from '../../shared/storage/storage.service'; 

@Injectable()
export class BranchService {
  
  private _apiUrl = '/api/v1/branches';

  private _branchSurveysApiUrl = '/api/v1/branch_surveys';

  redirectUrl: string;//store the URL so we can redirect after logging in

  constructor(
                private http: Http,
                private _storage: StorageService) {}

  
  getBranches(): Observable<any>{
      return this.http.get( this._apiUrl )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  addBranch(branch): Observable<any>{
      
      return this.http.post( this._apiUrl, JSON.stringify( branch ) )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  saveBranchSurveys(surveyId, branchId): Observable<any>{

      return this.http.post( this._branchSurveysApiUrl, JSON.stringify( {survey_id: surveyId, branch_id: branchId} ) )
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  removeBranchSurveys(surveyId, branchId): Observable<any>{

      return this.http.get( this._branchSurveysApiUrl + `/survey/${surveyId}/branch/${branchId}`)
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
