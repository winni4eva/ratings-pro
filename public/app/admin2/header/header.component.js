System.register(['@angular/core', '../../auth/login/login.service', '@angular/router', '../../shared/storage/storage.service', 'angular2-notifications'], function(exports_1, context_1) {
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
    var core_1, login_service_1, router_1, storage_service_1, angular2_notifications_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent(_loginService, _storageService, _router, _notification) {
                    this._loginService = _loginService;
                    this._storageService = _storageService;
                    this._router = _router;
                    this._notification = _notification;
                }
                HeaderComponent.prototype.ngOnInit = function () {
                    this._info = (this._storageService.get('rUser')) ?
                        JSON.parse(this._storageService.get('rUser')) : {};
                };
                HeaderComponent.prototype.logout = function () {
                    var _this = this;
                    this._loginService.getLogout()
                        .subscribe(function (response) {
                        _this._loginService.cleanAuthDetails();
                        _this._router.navigate(['login']);
                        _this._notification.success('Success', response.success);
                    }, function (error) { return _this._notification.error('Error', error); });
                };
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'my-header',
                        template: "\n   <nav class=\"navbar navbar-default navbar-fixed\">\n            <div class=\"container-fluid\">\n                <div class=\"navbar-header\">\n                    <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navigation-example-2\">\n                        <span class=\"sr-only\">Toggle navigation</span>\n                        <span class=\"icon-bar\"></span>\n                        <span class=\"icon-bar\"></span>\n                        <span class=\"icon-bar\"></span>\n                    </button>\n                    <a class=\"navbar-brand\" href=\"#\">Dashboard</a>\n                </div>\n                <div class=\"collapse navbar-collapse\">\n                    <ul class=\"nav navbar-nav navbar-left\">\n                        <li>\n                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                                <i class=\"fa fa-dashboard\"></i>\n                            </a>\n                        </li>\n                        <!--\n                        <li class=\"dropdown\">\n                              <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                                    <i class=\"fa fa-globe\"></i>\n                                    <b class=\"caret\"></b>\n                                    <span class=\"notification\">5</span>\n                              </a>\n                              <ul class=\"dropdown-menu\">\n                                <li><a href=\"#\">Notification 1</a></li>\n                                <li><a href=\"#\">Notification 2</a></li>\n                                <li><a href=\"#\">Notification 3</a></li>\n                                <li><a href=\"#\">Notification 4</a></li>\n                                <li><a href=\"#\">Another notification</a></li>\n                              </ul>\n                        </li>\n                        -->\n                        <li>\n                           <a href=\"\">\n                                <i class=\"fa fa-search\"></i>\n                            </a>\n                        </li>\n                    </ul>\n\n                    <ul class=\"nav navbar-nav navbar-right\">\n                        <li class=\"dropdown\">\n                              <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                                    Branch\n                                    <b class=\"caret\"></b>\n                              </a>\n                              <ul class=\"dropdown-menu\">\n                                <li><a [routerLink]=\"['/admin/view_branches']\">Branches</a></li>\n                                <li><a [routerLink]=\"['/admin/add_branch']\">New</a></li>\n                              </ul>\n                        </li>\n                        <li class=\"dropdown\">\n                              <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                                    Survey\n                                    <b class=\"caret\"></b>\n                              </a>\n                              <ul class=\"dropdown-menu\">\n                                <li><a [routerLink]=\"['/admin/view_categories']\">Categories</a></li>\n                                <li><a [routerLink]=\"['/admin/add_category']\">New</a></li>\n                                <li class=\"divider\"></li>\n                                <li><a [routerLink]=\"['/admin/view_surveys']\">Surveys</a></li>\n                                <li><a [routerLink]=\"['/admin/add_survey']\">New</a></li>\n                              </ul>\n                        </li>\n                        <li class=\"dropdown\">\n                              <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                                    Misc\n                                    <b class=\"caret\"></b>\n                              </a>\n                              <ul class=\"dropdown-menu\">\n                                <li><a [routerLink]=\"['/admin/view_responses']\">Responses</a></li>\n                                <li><a [routerLink]=\"['/admin/add_response']\">New</a></li>\n                                <li class=\"divider\"></li>\n                                <li><a [routerLink]=\"['/admin/view_images']\">Images</a></li>\n                                <li><a [routerLink]=\"['/admin/add_image']\">New</a></li>\n                              </ul>\n                        </li>\n                        <li class=\"dropdown\">\n                              <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                                    User\n                                    <b class=\"caret\"></b>\n                              </a>\n                              <ul class=\"dropdown-menu\">\n                                <li><a [routerLink]=\"['/admin/view_users']\">Users</a></li>\n                                <li><a [routerLink]=\"['/admin/add_user']\">New</a></li>\n                              </ul>\n                        </li>\n                        <li>\n                            <a (click)=\"logout()\" style=\"cursor:pointer\">\n                                Log out [ {{_info[0]?.first_name}} ]\n                            </a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </nav>\n    "
                    }), 
                    __metadata('design:paramtypes', [login_service_1.LoginService, storage_service_1.StorageService, router_1.Router, angular2_notifications_1.NotificationsService])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});

//# sourceMappingURL=header.component.js.map
