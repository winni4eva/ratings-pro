System.register(['@angular/core', '@angular/http', 'rxjs/Observable', 'rxjs/Rx', '../../shared/storage/storage.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, storage_service_1;
    var FileService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            }],
        execute: function() {
            FileService = (function () {
                function FileService(http, _storage) {
                    this.http = http;
                    this._storage = _storage;
                    this._apiUrl = '/api/v1/files';
                }
                FileService.prototype.generate = function (resource, fileType) {
                    return this.http.post(this._apiUrl, JSON.stringify({ resource: resource, fileType: fileType }))
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                FileService.prototype.printReport = function (data, fileType) {
                    var byteCharacters = atob(data); //decode a base64-encoded string
                    var byteNumbers = new Array(byteCharacters.length);
                    var length = byteCharacters.length;
                    /*
                        Each character's code point (charCode) will be the value of the byte.
                        We can create an array of byte values by applying this using the .
                        charCodeAt method for each character in the string.
                    */
                    for (var i = 0; i < length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    var byteArray = new Uint8Array(byteNumbers); //Convert array of byte values into a real typed byte array
                    if (fileType == 'pdf') {
                        var blob = new Blob([byteArray], { type: 'application/pdf' });
                    }
                    else if (fileType == 'excel') {
                        var blob = new Blob([byteArray], { type: 'application/vnd.ms-excel' });
                    }
                    return window.URL.createObjectURL(blob);
                };
                FileService.prototype.extractData = function (res) {
                    return res.json() || {};
                };
                FileService.prototype.handleError = function (error) {
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    return Observable_1.Observable.throw(errMsg);
                };
                FileService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, storage_service_1.StorageService])
                ], FileService);
                return FileService;
            }());
            exports_1("FileService", FileService);
        }
    }
});

//# sourceMappingURL=file.service.js.map
