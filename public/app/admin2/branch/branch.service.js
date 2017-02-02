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
    var BranchService;
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
            BranchService = (function () {
                function BranchService(http, _storage) {
                    this.http = http;
                    this._storage = _storage;
                    this._apiUrl = '/api/v1/branches';
                    this._branchSurveysApiUrl = '/api/v1/branch_surveys';
                }
                BranchService.prototype.getBranches = function () {
                    return this.http.get(this._apiUrl)
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                BranchService.prototype.addBranch = function (branch) {
                    return this.http.post(this._apiUrl, JSON.stringify(branch))
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                BranchService.prototype.saveBranchSurveys = function (surveyId, branchId) {
                    return this.http.post(this._branchSurveysApiUrl, JSON.stringify({ survey_id: surveyId, branch_id: branchId }))
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                BranchService.prototype.removeBranchSurveys = function (surveyId, branchId) {
                    return this.http.get(this._branchSurveysApiUrl + ("/survey/" + surveyId + "/branch/" + branchId))
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                BranchService.prototype.extractData = function (res) {
                    return res.json() || {};
                };
                BranchService.prototype.handleError = function (error) {
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    return Observable_1.Observable.throw(errMsg);
                };
                BranchService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, storage_service_1.StorageService])
                ], BranchService);
                return BranchService;
            }());
            exports_1("BranchService", BranchService);
        }
    }
});

//# sourceMappingURL=branch.service.js.map
