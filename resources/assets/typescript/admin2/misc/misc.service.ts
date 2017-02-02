import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { StorageService } from '../../shared/storage/storage.service'; 

@Injectable()
export class MiscService {
  
  private _apiImageUrl = '/api/v1/images';

  private _apiResponseUrl = '/api/v1/responses';

  constructor(
                private http: Http,
                private _storage: StorageService) {}

  
  getImages(): Observable<any>{
      return this.http.get( this._apiImageUrl )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  addImage(files): Observable<any>{
      
    return Observable.create(observer => {
                
                let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

                if(files){
                    for (let i = 0; i < files.length; i++) {
                        console.log(files[i]);
                        formData.append("image", files[i], files[i].name);
                    }
                }

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            observer.next(JSON.parse(xhr.response));
                            observer.complete();
                        } else {
                            observer.error(xhr.response);
                        }
                    }
                };

                //xhr.upload.onprogress = (event) => {
                    //this.progress = Math.round(event.loaded / event.total * 100);

                    //this.progressObserver.next(this.progress);
                //};

                xhr.open('POST', this._apiImageUrl , true);
                let authToken = 'Bearer '  +  localStorage.getItem('rToken');
                xhr.setRequestHeader('Authorization', authToken );
                xhr.setRequestHeader('Accept', 'application/json' );
                xhr.send(formData);

            });
      
  }

  getResponses(currentPage, itemsPerPage): Observable<any>{
      return this.http.get( this._apiResponseUrl + `?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}` )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  removeResponse(responseId): Observable<any>{
      return this.http.delete( this._apiResponseUrl +'/'+ responseId )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  addResponse(resp): Observable<any>{
      
      return this.http.post( this._apiResponseUrl, JSON.stringify( resp ) )
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
