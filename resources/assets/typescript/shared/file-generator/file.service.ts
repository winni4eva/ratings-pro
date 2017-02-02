import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { StorageService } from '../../shared/storage/storage.service'; 

@Injectable()
export class FileService {
  
  private _apiUrl = '/api/v1/files';

  constructor(
                private http: Http,
                private _storage: StorageService) {}


  generate(resource: string, fileType): Observable<any>{
      
      return this.http.post( this._apiUrl, JSON.stringify( {resource: resource, fileType: fileType} ) )
                      .map(this.extractData)
                      .catch(this.handleError);
      
  }

  printReport(data: any, fileType){

        let byteCharacters = atob(data);//decode a base64-encoded string

        let byteNumbers = new Array(byteCharacters.length);

        let length = byteCharacters.length;

        /*
            Each character's code point (charCode) will be the value of the byte. 
            We can create an array of byte values by applying this using the .
            charCodeAt method for each character in the string.
        */
        for (let i = 0; i < length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);//Convert array of byte values into a real typed byte array

        if(fileType == 'pdf') {
            var blob = new Blob([byteArray], { type: 'application/pdf' });
        }else if(fileType == 'excel'){
            var blob = new Blob([byteArray], { type: 'application/vnd.ms-excel' });
        }

        return window.URL.createObjectURL(blob);

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
