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
    var MiscService;
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
            MiscService = (function () {
                function MiscService(http, _storage) {
                    this.http = http;
                    this._storage = _storage;
                    this._apiImageUrl = '/api/v1/images';
                    this._apiResponseUrl = '/api/v1/responses';
                }
                MiscService.prototype.getImages = function () {
                    return this.http.get(this._apiImageUrl)
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                MiscService.prototype.addImage = function (files) {
                    var _this = this;
                    return Observable_1.Observable.create(function (observer) {
                        var formData = new FormData(), xhr = new XMLHttpRequest();
                        if (files) {
                            for (var i = 0; i < files.length; i++) {
                                console.log(files[i]);
                                formData.append("image", files[i], files[i].name);
                            }
                        }
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    observer.next(JSON.parse(xhr.response));
                                    observer.complete();
                                }
                                else {
                                    observer.error(xhr.response);
                                }
                            }
                        };
                        //xhr.upload.onprogress = (event) => {
                        //this.progress = Math.round(event.loaded / event.total * 100);
                        //this.progressObserver.next(this.progress);
                        //};
                        xhr.open('POST', _this._apiImageUrl, true);
                        var authToken = 'Bearer ' + localStorage.getItem('rToken');
                        xhr.setRequestHeader('Authorization', authToken);
                        xhr.setRequestHeader('Accept', 'application/json');
                        xhr.send(formData);
                    });
                };
                MiscService.prototype.getResponses = function (responseId) {
                    if (responseId === void 0) { responseId = 0; }
                    return this.http.get(this._apiResponseUrl + ("?responseId=" + responseId))
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                MiscService.prototype.removeResponse = function (responseId) {
                    return this.http.delete(this._apiResponseUrl + '/' + responseId)
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                MiscService.prototype.addResponse = function (resp, responseId) {
                    if (responseId === void 0) { responseId = 0; }
                    return this.http.post(this._apiResponseUrl + ("?responseId=" + responseId), JSON.stringify(resp))
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                MiscService.prototype.removeImage = function (imageId) {
                    return this.http.delete(this._apiImageUrl + '/' + imageId)
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                MiscService.prototype.extractData = function (res) {
                    return res.json() || {};
                };
                MiscService.prototype.handleError = function (error) {
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    return Observable_1.Observable.throw(errMsg);
                };
                MiscService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, storage_service_1.StorageService])
                ], MiscService);
                return MiscService;
            }());
            exports_1("MiscService", MiscService);
        }
    }
});

//# sourceMappingURL=misc.service.js.map
