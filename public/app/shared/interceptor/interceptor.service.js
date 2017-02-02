System.register(['@angular/core', 'rxjs/Observable', '@angular/http', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1, http_1;
    var CustomHttp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            CustomHttp = (function (_super) {
                __extends(CustomHttp, _super);
                function CustomHttp(backend, defaultOptions) {
                    _super.call(this, backend, defaultOptions);
                    //const injector = ReflectiveInjector.resolveAndCreate([StorageService]);
                    //this._storage = injector.get([StorageService]);
                }
                CustomHttp.prototype.request = function (url, options) {
                    return this.intercept(_super.prototype.request.call(this, url, this.getRequestOptionArgs(options)));
                };
                CustomHttp.prototype.get = function (url, options) {
                    return this.intercept(_super.prototype.get.call(this, url, this.getRequestOptionArgs(options)));
                };
                CustomHttp.prototype.post = function (url, body, options) {
                    return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
                };
                CustomHttp.prototype.put = function (url, body, options) {
                    return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
                };
                CustomHttp.prototype.delete = function (url, options) {
                    return this.intercept(_super.prototype.delete.call(this, url, options));
                };
                CustomHttp.prototype.getRequestOptionArgs = function (options) {
                    if (options == null) {
                        options = new http_1.RequestOptions();
                    }
                    if (options.headers == null) {
                        options.headers = new http_1.Headers();
                    }
                    options.headers.append('Content-Type', 'application/json');
                    options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('rToken'));
                    //options.headers.append('Accept', 'application/json');
                    return options;
                };
                CustomHttp.prototype.intercept = function (observable) {
                    return observable.catch(function (err, source) {
                        if (err.status == 401 || err.status == 404) {
                            localStorage.removeItem('rToken');
                            localStorage.removeItem('rUser');
                            localStorage.removeItem('rAuth');
                            window.location.href = '#/login';
                            return Observable_1.Observable.empty();
                        }
                        else {
                            return Observable_1.Observable.throw(err);
                        }
                    });
                };
                CustomHttp = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions])
                ], CustomHttp);
                return CustomHttp;
            }(http_1.Http));
            exports_1("CustomHttp", CustomHttp);
        }
    }
});

//# sourceMappingURL=interceptor.service.js.map
