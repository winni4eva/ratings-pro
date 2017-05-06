import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { StorageService } from '../../shared/storage/storage.service'; 

@Injectable()
export class ZoneService {
  
  private _apiZonesUrl = '/api/v1/zones';

  constructor(
                private http: Http,
                private _storage: StorageService) {}

  
  getZones(): Observable<any>{
      return this.http.get( this._apiZonesUrl )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  addZone(zone): Observable<any>{
      return this.http.post( this._apiZonesUrl, JSON.stringify( zone ) )
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  addZoneBranch(branchId, zoneId): Observable<any>{
      return this.http.post( this._apiZonesUrl + `/zone_branches`, JSON.stringify( {branch_id: branchId, zone_id: zoneId} ) )
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  removeZoneBranch(branchId, zoneId): Observable<any>{
      return this.http.get( this._apiZonesUrl + `/branch_id/${branchId}/zone_id/${zoneId}/zone_branches` )
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
