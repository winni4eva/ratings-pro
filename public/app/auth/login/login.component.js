System.register(['@angular/core', '@angular/forms', '../../shared/validator/custom-validator.service', './login.service', '@angular/router', 'angular2-notifications'], function(exports_1, context_1) {
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
    var core_1, forms_1, custom_validator_service_1, login_service_1, router_1, angular2_notifications_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (custom_validator_service_1_1) {
                custom_validator_service_1 = custom_validator_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_loginService, _fb, router, _notification) {
                    this._loginService = _loginService;
                    this._fb = _fb;
                    this.router = router;
                    this._notification = _notification;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                }
                LoginComponent.prototype.ngOnInit = function () {
                    if (this._loginService.getIsLoggedIn())
                        this.router.navigate(['admin']);
                    this._loginForm = this._fb.group({
                        email: ['', [forms_1.Validators.required, custom_validator_service_1.CustomValidator.mailFormat]],
                        password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]]
                    });
                };
                LoginComponent.prototype.login = function (model, isValid) {
                    var _this = this;
                    if (!isValid)
                        return;
                    this._loginService.postLogin(model)
                        .subscribe(function (response) {
                        _this._loginService.setAuthDetails(response);
                        if (response.user[0].role == 'admin')
                            _this.router.navigate(['admin']);
                        _this.router.navigate(['admin/report']);
                    }, function (error) {
                        console.log(error);
                        _this._notification.error('Error', error);
                    });
                };
                LoginComponent.prototype.logout = function () {
                    var _this = this;
                    this._loginService.getLogout()
                        .subscribe(function (response) {
                        console.log(response);
                        _this._loginService.cleanAuthDetails();
                        _this.router.navigate(['login']);
                    }, function (error) {
                        _this._loginService.cleanAuthDetails();
                        _this.router.navigate(['login']);
                        console.log(error);
                    });
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'my-login',
                        template: "\n      <style>\n          .myLabel{margin:0px !important;}\n          .myInput{\n              width:100% !important;\n              height:80% !important;\n              outline:none !important;\n              font-size:20px !important;\n          }\n          .inputError{color:red}\n      </style> \n\n      <simple-notifications [options]=\"_options\"></simple-notifications>\n\n      <div class=\"logmod\">\n          <div class=\"logmod__wrapper\">\n\n            <span class=\"logmod__close\">Close</span>\n\n            <div class=\"logmod__container\">\n              <ul class=\"logmod__tabs\">\n                <li data-tabtar=\"lgm-4\" [ngClass]=\"\"><a [routerLink]=\"['/login']\">Login</a></li>\n                <!--<li data-tabtar=\"lgm-1\" [ngClass]=\"\"><a [routerLink]=\"['/auth/signup']\">Sign Up</a></li>-->\n              </ul>\n\n              <div class=\"logmod__tab-wrapper\"><!-- Login / Signup Container -->\n                  <div class=\"logmod__tab lgm-2\">\n                    <div class=\"logmod__heading\">\n                    <span class=\"logmod__heading-subtitle\">Enter your email and password <strong>to sign in</strong></span>\n                    </div> \n                    <div class=\"logmod__form\">\n                    <form autocomplete=\"off\" [formGroup]=\"_loginForm\" (ngSubmit)=\"login(_loginForm.value, _loginForm.valid)\" novalidate class=\"simform\">\n                        <div class=\"sminputs\">\n                        <div class=\"input full\">\n                            <!--<label class=\"string optional\" for=\"user-name\">Email*</label>-->\n                            <input class=\"string optional myInput\" formControlName=\"email\" maxlength=\"255\" id=\"user-email\" placeholder=\"Email\" type=\"email\" size=\"50\" />\n                            <small [hidden]=\"_loginForm.controls.email.pristine || !_loginForm.controls.email.hasError('required')\" class=\"inputError\">Email is required.</small>\n                            <small [hidden]=\"!_loginForm.controls.email.hasError('incorrectMailFormat')\" class=\"inputError\">Email format should be <i>example@example.com</i>.</small>\n                        </div>\n                        </div>\n                        <div class=\"sminputs\">\n                        <div class=\"input full\">\n                            <!--<label class=\"string optional\" for=\"user-pw\">Password *</label>-->\n                            <input class=\"string optional myInput\" formControlName=\"password\" maxlength=\"255\" id=\"user-pw\" placeholder=\"Password\" type=\"password\" size=\"50\" />\n                            <small [hidden]=\"_loginForm.controls.password.pristine || !_loginForm.controls.password.hasError('required')\" class=\"inputError\">Password is required.</small>\n                            <small [hidden]=\"!_loginForm.controls.password.hasError('minLength')\" class=\"inputError\">Passwors must be at least 5 xters long.</small>\n                        </div>\n                        </div>\n                        <div class=\"simform__actions\">\n                        <button class=\"sumbit\" name=\"commit\" type=\"sumbit\" [disabled]=\"!_loginForm.valid\">Log In</button>\n                        <span class=\"simform__actions-sidetext\"><a class=\"special\" role=\"link\" href=\"#\">Forgot your password?<br>Click here</a></span>\n                        </div> \n                    </form>\n                    </div> \n              </div>\n            </div>\n          </div>\n        </div>\n\n    "
                    }), 
                    __metadata('design:paramtypes', [login_service_1.LoginService, forms_1.FormBuilder, router_1.Router, angular2_notifications_1.NotificationsService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});

//# sourceMappingURL=login.component.js.map
