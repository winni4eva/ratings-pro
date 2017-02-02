System.register(['@angular/core', '@angular/http', 'rxjs/Observable', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var AuthService;
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
            function (_1) {}],
        execute: function() {
            AuthService = (function () {
                function AuthService(http) {
                    this.http = http;
                    this.apiAuthUrl = '/api/v1/';
                    this.isLoggedIn = false;
                }
                AuthService.prototype.postLogin = function (loginDetails) {
                    return this.http.post('/api/login', JSON.stringify(loginDetails))
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                AuthService.prototype.postSignUp = function (signUpDetails) {
                    return this.http.post('/api/signup', JSON.stringify(signUpDetails))
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                AuthService.prototype.getLogout = function () {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') });
                    var options = new http_1.RequestOptions({ headers: headers, body: '' });
                    return this.http.get('/api/logout/', options)
                        .map(this.extractData)
                        .catch(this.handleError);
                    //.subscribe(this.extractData, this.handleError);
                };
                AuthService.prototype.extractData = function (res) {
                    return res.json() || {};
                };
                AuthService.prototype.handleError = function (error) {
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    return Observable_1.Observable.throw(errMsg);
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});

//# sourceMappingURL=auth.service.js.map
