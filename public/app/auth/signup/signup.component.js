System.register(['@angular/core', '@angular/forms', '../../shared/validator/custom-validator.service', '../auth.service'], function(exports_1, context_1) {
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
    var core_1, forms_1, custom_validator_service_1, auth_service_1;
    var SignUpComponent;
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
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            SignUpComponent = (function () {
                function SignUpComponent(_authService, _fb) {
                    this._authService = _authService;
                    this._fb = _fb;
                }
                SignUpComponent.prototype.signup = function (model, isValid) {
                    if (!isValid)
                        return;
                    this._authService.postSignUp(model)
                        .subscribe(function (response) {
                        console.log(response);
                    }, function (error) {
                        console.log(error);
                    });
                };
                SignUpComponent.prototype.ngOnInit = function () {
                    this._signUpForm = this._fb.group({
                        email: ['', [forms_1.Validators.required, custom_validator_service_1.CustomValidator.mailFormat]],
                        first_name: ['', forms_1.Validators.required],
                        last_name: ['', forms_1.Validators.required],
                        company: ['', forms_1.Validators.required],
                        passwords: this.initPasswordsFormGroup()
                    });
                    this.subscribeToFormChangesAndSetValidity();
                };
                SignUpComponent.prototype.subscribeToFormChangesAndSetValidity = function () {
                    var _this = this;
                    var myFormValueChanges$ = this._signUpForm.controls["passwords"].valueChanges;
                    myFormValueChanges$.subscribe(function (x) {
                        if (x.password === x.password_confirmation)
                            _this._signUpForm.controls["passwords"].controls["password_confirmation"].setErrors(null);
                        else
                            _this._signUpForm.controls["passwords"].controls["password_confirmation"].setErrors({ "notValid": true });
                    });
                };
                SignUpComponent.prototype.initPasswordsFormGroup = function () {
                    var group = this._fb.group({
                        password: ['', forms_1.Validators.required],
                        password_confirmation: ['', forms_1.Validators.required]
                    });
                    return group;
                };
                SignUpComponent = __decorate([
                    core_1.Component({
                        selector: 'my-signup',
                        template: "\n        <style>\n            .myLabel{margin:0px !important;}\n            .myInput{\n                width:100% !important;\n                height:80% !important;\n                outline:none !important;\n                font-size:20px !important;\n            }\n            .inputError{color:red}\n        </style>    \n\n      <div class=\"logmod__tab lgm-1\">\n            <div class=\"logmod__heading\">\n                <span class=\"logmod__heading-subtitle\">Enter your personal details <strong>to create an acount</strong></span>\n            </div>\n            <div class=\"logmod__form\">\n                <form autocomplete=\"off\" [formGroup]=\"_signUpForm\" (ngSubmit)=\"signup(_signUpForm.value, _signUpForm.valid)\" novalidate class=\"simform\">\n                    \n                    <div class=\"sminputs\">\n                        <div class=\"input full\">\n                            <!--<label class=\"string optional myLabel\" for=\"email\" *ngIf=\"!_signUpForm.controls.email.hasError('required') && !_signUpForm.controls.email.hasError('incorrectMailFormat')\">Email*</label>-->\n                            \n                            <input class=\"string optional myInput\" formControlName=\"email\" id=\"email\" name=\"email\" placeholder=\"Email\" type=\"email\" />\n                            \n                            <small [hidden]=\"_signUpForm.controls.email.pristine || !_signUpForm.controls.email.hasError('required')\" class=\"inputError\">Email is required.</small>\n                            <small [hidden]=\"!_signUpForm.controls.email.hasError('incorrectMailFormat')\" class=\"inputError\">Email format should be <i>example@example.com</i>.</small>\n                        </div>\n                    </div>\n\n                    <div class=\"sminputs\">\n                        <div class=\"input full\">\n                            <!--<label class=\"string optional\" for=\"first_name\">Last Name*</label>-->\n                            <input class=\"string optional myInput\" formControlName=\"first_name\" id=\"first_name\" name=\"first_name\" placeholder=\"First Name\" type=\"text\" />\n                            <small [hidden]=\"_signUpForm.controls.first_name.pristine || !_signUpForm.controls.first_name.hasError('required')\" class=\"inputError\">First name is required.</small>\n                        </div>\n                    </div>\n\n                    <div class=\"sminputs\">\n                        <div class=\"input full\">\n                            <!--<label class=\"string optional\" for=\"last_name\">Last Name*</label>-->\n                            <input class=\"string optional myInput\" formControlName=\"last_name\" id=\"last_name\" name=\"last_name\" placeholder=\"Last Name\" type=\"text\" />\n                            <small [hidden]=\"_signUpForm.controls.last_name.pristine || !_signUpForm.controls.last_name.hasError('required')\" class=\"inputError\">Last name is required.</small>\n                        </div>\n                    </div>\n\n                    <div class=\"sminputs\">\n                        <div class=\"input full\">\n                            <!--<label class=\"string optional\" for=\"company\">Company*</label>-->\n                            <input class=\"string optional myInput\" formControlName=\"company\" id=\"company\" name=\"company\" placeholder=\"Company\" type=\"text\" />\n                            <small [hidden]=\"_signUpForm.controls.company.pristine || !_signUpForm.controls.company.hasError('required')\" class=\"inputError\">Company is required.</small>\n                        </div>\n                    </div>\n                    \n                    <div class=\"sminputs\" formGroupName=\"passwords\">\n                        <div class=\"input string optional\">\n                            <!--<label class=\"string optional\" for=\"user-pw\">Password *</label>-->\n                            <input class=\"string optional myInput\" formControlName=\"password\" id=\"user-pw\" placeholder=\"Password\" type=\"password\" />\n                            <small [hidden]=\"_signUpForm.controls.passwords.controls.password.pristine || !_signUpForm.controls.passwords.controls.password.hasError('required')\" class=\"inputError\">Password is required.</small>\n                        </div>\n                        <div class=\"input string optional\">\n                            <!--<label class=\"string optional\" for=\"user-pw-repeat\">Repeat password *</label>-->\n                            <input class=\"string optional myInput\" formControlName=\"password_confirmation\" id=\"user-pw-repeat\" placeholder=\"Repeat password\" type=\"password\" />\n                            <small [hidden]=\"_signUpForm.controls.passwords.controls.password_confirmation.pristine || !_signUpForm.controls.passwords.controls.password_confirmation.hasError('required')\" class=\"inputError\">Password confirm is required.</small>\n                            <small [hidden]=\"_signUpForm.controls.passwords.controls.password_confirmation.pristine || !_signUpForm.controls.passwords.controls.password_confirmation.hasError('notValid')\" class=\"inputError\">Password mismatch.</small>\n                        </div>\n                    </div>\n                    \n                    <div class=\"simform__actions\">\n                        <button class=\"sumbit\" type=\"sumbit\" [disabled]=\"!_signUpForm.valid\">Create Account</button>\n                        <span class=\"simform__actions-sidetext\">By creating an account you agree to our <a class=\"special\" href=\"#\" target=\"_blank\" role=\"link\">Terms & Privacy</a></span>\n                    </div> \n\n                </form>\n            </div>  \n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, forms_1.FormBuilder])
                ], SignUpComponent);
                return SignUpComponent;
            }());
            exports_1("SignUpComponent", SignUpComponent);
        }
    }
});

//# sourceMappingURL=signup.component.js.map
