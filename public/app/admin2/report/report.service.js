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
    var ReportService;
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
            ReportService = (function () {
                function ReportService(http, _storage) {
                    this.http = http;
                    this._storage = _storage;
                    this._apiReportUrl = '/api/v1/reports';
                }
                ReportService.prototype.getReport = function (filter) {
                    return this.http.get(this._apiReportUrl + ("?from=" + filter[0].from + "&to=" + filter[0].to + "&tab=" + filter[0].tab))
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                ReportService.prototype.extractData = function (res) {
                    return res.json() || {};
                };
                ReportService.prototype.handleError = function (error) {
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    return Observable_1.Observable.throw(errMsg);
                };
                ReportService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, storage_service_1.StorageService])
                ], ReportService);
                return ReportService;
            }());
            exports_1("ReportService", ReportService);
        }
    }
});

//# sourceMappingURL=report.service.js.map
