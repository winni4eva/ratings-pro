System.register(['@angular/core', '@angular/router', './login/login.service', '../shared/storage/storage.service'], function(exports_1, context_1) {
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
    var core_1, router_1, login_service_1, storage_service_1;
    var AuthGuard;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            }],
        execute: function() {
            AuthGuard = (function () {
                function AuthGuard(router, authService, storageService) {
                    this.router = router;
                    this.authService = authService;
                    this.storageService = storageService;
                }
                AuthGuard.prototype.canActivate = function (route, state) {
                    if (this.authService.getIsLoggedIn())
                        return true;
                    //  if (state.url !== '/login' && !this.authService.isAuthenticated()) {
                    //     this.router.navigate(['/login']);
                    //     return false;
                    // }
                    // return true;
                    //Todo Logout on server
                    this.storageService.remove('rToken');
                    this.storageService.remove('rUser');
                    this.storageService.remove('rAuth');
                    this.router.navigate(['/login']); // Navigate to the login page
                    return false;
                    //this.authService.redirectUrl = state.url;// Store the attempted URL for redirecting
                };
                AuthGuard = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, login_service_1.LoginService, storage_service_1.StorageService])
                ], AuthGuard);
                return AuthGuard;
            }());
            exports_1("AuthGuard", AuthGuard);
        }
    }
});

//# sourceMappingURL=auth.guard.js.map
