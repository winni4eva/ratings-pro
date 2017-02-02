System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var AuthComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AuthComponent = (function () {
                function AuthComponent() {
                }
                AuthComponent = __decorate([
                    core_1.Component({
                        selector: 'my-auth',
                        template: "\n        <div class=\"logmod\">\n          <div class=\"logmod__wrapper\">\n\n            <span class=\"logmod__close\">Close</span>\n\n            <div class=\"logmod__container\">\n              <ul class=\"logmod__tabs\">\n                <li data-tabtar=\"lgm-2\" [ngClass]=\"\"><a [routerLink]=\"['/auth/login']\">Login</a></li>\n                <!--<li data-tabtar=\"lgm-1\" [ngClass]=\"\"><a [routerLink]=\"['/auth/signup']\">Sign Up</a></li>-->\n              </ul>\n\n              <div class=\"logmod__tab-wrapper\"><!-- Login / Signup Container -->\n                  <router-outlet></router-outlet>\n              </div>\n            </div>\n          </div>\n        </div>\n\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AuthComponent);
                return AuthComponent;
            }());
            exports_1("AuthComponent", AuthComponent);
        }
    }
});

//# sourceMappingURL=auth.component.js.map
