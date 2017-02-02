System.register(['@angular/core', '../../auth/login/login.service', '../../shared/storage/storage.service', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, login_service_1, storage_service_1, router_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent(_loginService, _storageService, _router) {
                    this._loginService = _loginService;
                    this._storageService = _storageService;
                    this._router = _router;
                }
                HeaderComponent.prototype.ngOnInit = function () {
                    this._info = (this._storageService.get('rUser')) ?
                        JSON.parse(this._storageService.get('rUser')) : {};
                    console.log(this._info[0].branches[0].name);
                };
                HeaderComponent.prototype.logout = function () {
                    var _this = this;
                    this._loginService.getLogout()
                        .subscribe(function (response) {
                        console.log(response);
                        _this._loginService.cleanAuthDetails();
                        _this._router.navigate(['login']);
                    }, function (error) {
                        console.log(error);
                    });
                };
                HeaderComponent.prototype.ngOnDestroy = function () {
                    this._info = '';
                };
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'my-header',
                        template: "\n     <!-- Logo -->\n    <a class=\"logo\">\n      <!-- mini logo for sidebar mini 50x50 pixels -->\n      <span class=\"logo-mini\"><b>D</b>S</span>\n      <!-- logo for regular state and mobile devices -->\n      <span class=\"logo-lg\"><b>{{_info[0]?.company}}</b> [ {{_info[0]?.branches[0]?.name}} ]</span>\n    </a>\n    <!-- Header Navbar: style can be found in header.less -->\n    <nav class=\"navbar navbar-static-top\">\n      <!-- Sidebar toggle button-->\n      <a href=\"#\" class=\"sidebar-toggle\" data-toggle=\"offcanvas\" role=\"button\">\n        <span class=\"sr-only\">Toggle navigation</span>\n      </a>\n\n      <div class=\"navbar-custom-menu\">\n        <ul class=\"nav navbar-nav\">\n          \n          <!-- User Account: style can be found in dropdown.less -->\n          <li class=\"dropdown user user-menu\">\n            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n              <span class=\"hidden-xs\">{{_info[0]?.last_name+' '+_info[0]?.first_name}}</span>\n            </a>\n            <ul class=\"dropdown-menu\">\n              <!-- Menu Footer-->\n              <li class=\"user-footer\">\n                <div class=\"pull-right\">\n                  <a (click)=\"logout()\" class=\"btn btn-default btn-flat\">Sign out</a>\n                </div>\n              </li>\n            </ul>\n          </li>\n          <!-- Control Sidebar Toggle Button -->\n        </ul>\n      </div>\n    </nav>\n    "
                    }), 
                    __metadata('design:paramtypes', [login_service_1.LoginService, storage_service_1.StorageService, router_1.Router])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});

//# sourceMappingURL=header.component.js.map
