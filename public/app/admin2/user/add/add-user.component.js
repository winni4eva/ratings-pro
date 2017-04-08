System.register(['@angular/core', '@angular/router', '../../../shared/storage/storage.service', 'angular2-notifications', '@angular/forms', '../../../shared/validator/custom-validator.service', '../user.service', '../../branch/branch.service', '../../zones/zones.service', '../../../shared/validator/conditional-required.service'], function(exports_1, context_1) {
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
    var core_1, router_1, storage_service_1, angular2_notifications_1, forms_1, custom_validator_service_1, user_service_1, branch_service_1, zones_service_1, conditional_required_service_1;
    var AddUserComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (custom_validator_service_1_1) {
                custom_validator_service_1 = custom_validator_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (branch_service_1_1) {
                branch_service_1 = branch_service_1_1;
            },
            function (zones_service_1_1) {
                zones_service_1 = zones_service_1_1;
            },
            function (conditional_required_service_1_1) {
                conditional_required_service_1 = conditional_required_service_1_1;
            }],
        execute: function() {
            AddUserComponent = (function () {
                function AddUserComponent(_storageService, _router, _notification, _fb, _userService, _branchService, _zoneService, _activatedRoute) {
                    this._storageService = _storageService;
                    this._router = _router;
                    this._notification = _notification;
                    this._fb = _fb;
                    this._userService = _userService;
                    this._branchService = _branchService;
                    this._zoneService = _zoneService;
                    this._activatedRoute = _activatedRoute;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                }
                AddUserComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._activatedRoute.params.subscribe(function (params) { return _this._userId = params['userId']; });
                    this._branchService.getBranches().subscribe(function (result) { return _this._branches = result.branches; }, function (error) { return _this._notification.error('Error', error); });
                    this._zoneService.getZones().subscribe(function (result) { return _this._zones = result.zones; }, function (error) { return console.log(error); } //this._notification.error('Error', error)
                     //this._notification.error('Error', error)
                    );
                    this.form = this._fb.group({
                        first_name: ['', forms_1.Validators.required],
                        last_name: ['', forms_1.Validators.required],
                        email: ['', forms_1.Validators.compose([forms_1.Validators.required, custom_validator_service_1.CustomValidator.mailFormat])],
                        password: ['', forms_1.Validators.required],
                        company: ['', forms_1.Validators.required],
                        branch_id: ['', forms_1.Validators.required],
                        role: ['', forms_1.Validators.required],
                        zone_id: [
                            '',
                            forms_1.Validators.compose([
                                conditional_required_service_1.ConditionalValidator.conditional(function (group) { return group.controls.role.value == 'zonal'; }, forms_1.Validators.required)
                            ])
                        ]
                    });
                    if (this._userId > 0)
                        this.getUser(this._userId);
                };
                AddUserComponent.prototype.add = function (model, isValid) {
                    var _this = this;
                    //if(!isValid) return;
                    //console.log(model);
                    this._userService.addUser(model, this._userId).subscribe(function (result) { return _this._notification.success('Success', result.success); }, function (error) { return _this._notification.error('Error', error); });
                };
                AddUserComponent.prototype.getUser = function (userId) {
                    var _this = this;
                    if (userId === void 0) { userId = 0; }
                    this._userService.getUsers(userId).subscribe(function (result) {
                        _this._user = result.resource;
                        _this.initFormGroup(_this.form, {
                            first_name: _this._user.first_name,
                            last_name: _this._user.last_name,
                            email: _this._user.email,
                            company: _this._user.company,
                            branch_id: _this._user.branch_user[0].branch_id,
                            role: _this._user.role,
                            zone_id: (_this._user.role == 'zonal' || _this._user.role == 'branch') ? _this._user.role_branch_zone_id : undefined
                        });
                    }, function (error) { return console.log(error); } //this._notification.error('Error', error)
                     //this._notification.error('Error', error)
                    );
                };
                AddUserComponent.prototype.initFormGroup = function (form, data) {
                    for (var key in form.controls) {
                        //console.log(key);
                        if (form.controls[key] instanceof forms_1.FormControl) {
                            if (data[key]) {
                                var control = form.controls[key];
                                this.initFormControl(control, data[key]);
                            }
                        }
                        else if (form.controls[key] instanceof forms_1.FormGroup) {
                            if (data[key]) {
                                this.initFormGroup(form.controls[key], data[key]);
                            }
                        }
                    }
                };
                //   initFormArray(array: FormArray, data: Array<any>){
                //     if(data.length>0){
                //         var clone = array.controls[0];
                //         array.removeAt(0);
                //         for(var idx in data) {
                //             array.push(_.cloneDeep(clone));
                //             if(clone instanceof FormGroup)
                //             this.initFormGroup(<FormGroup>array.controls[idx], data[idx]);
                //             else if(clone instanceof FormControl)
                //             this.initFormControl(<FormControl>array.controls[idx], data[idx]);
                //             else if(clone instanceof FormArray)
                //             this.initFormArray(<FormArray>array.controls[idx], data[idx]);
                //         }
                //     }
                // }
                AddUserComponent.prototype.initFormControl = function (control, value) {
                    control.setValue(value);
                };
                AddUserComponent = __decorate([
                    core_1.Component({
                        selector: 'my-add-user',
                        template: "\n   <simple-notifications [options]=\"_options\"></simple-notifications>\n\n   <my-content [title]=\"(_userId>0)? 'Edit User' : 'Add User'\">\n        <div class=\"content\">\n            <form autocomplete=\"off\" [formGroup]=\"form\" (ngSubmit)=\"add(form.value, form.valid)\" novalidate>\n\n                <div class=\"row\">\n\n                    <div class=\"col-md-6\">\n\n                        <div class=\"form-group\">\n                            <label>First Name</label>\n                            <input type=\"text\" formControlName=\"first_name\" class=\"form-control\" placeholder=\"First name\">\n                            <small [hidden]=\"form.controls.first_name.pristine || !form.controls.first_name.hasError('required')\" class=\"inputError\">First name is required.</small>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label>Email</label>\n                            <input type=\"email\" formControlName=\"email\" class=\"form-control\" placeholder=\"Email\">\n                            <small [hidden]=\"form.controls.email.pristine || !form.controls.email.hasError('required')\" class=\"inputError\">Email is required.</small>\n                            <small [hidden]=\"!form.controls.email.hasError('incorrectMailFormat')\" class=\"inputError\">Email format should be <i>example@example.com</i>.</small>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label>Role</label>\n                            <select formControlName=\"role\" class=\"form-control\">\n                                <option value=\"branch\">Branch Manager</option>\n                                <option value=\"zonal\">Zonal/Regional Manager</option>\n                                <option value=\"admin\">Administrator</option>\n                            </select>\n                            <small [hidden]=\"form.controls.role.pristine || !form.controls.role.hasError('required')\" class=\"inputError\">User's role is required.</small>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label>Company</label>\n                            <input type=\"text\" formControlName=\"company\" class=\"form-control\" placeholder=\"Last name\">\n                            <small [hidden]=\"form.controls.company.pristine || !form.controls.company.hasError('required')\" class=\"inputError\">Company is required.</small>\n                        </div>\n                        \n                    </div>\n\n                    <div class=\"col-md-6\">\n\n                        <div class=\"form-group\">\n                            <label>Last Name</label>\n                            <input type=\"text\" formControlName=\"last_name\" class=\"form-control\" placeholder=\"Last name\">\n                            <small [hidden]=\"form.controls.last_name.pristine || !form.controls.last_name.hasError('required')\" class=\"inputError\">Last name is required.</small>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label>Password</label>\n                            <input type=\"password\" formControlName=\"password\" class=\"form-control\" placeholder=\"Password\">\n                            <small [hidden]=\"form.controls.password.pristine || !form.controls.password.hasError('required')\" class=\"inputError\">Password is required.</small>\n                        </div>\n\n                        <div class=\"form-group\" *ngIf=\"form.get('role').value=='zonal'\">\n                            <label>Zone</label>\n                            <select formControlName=\"zone_id\" class=\"form-control\">\n                                <option [value]=\"''\">--Select Zone--</option>\n                                <option [value]=\"zone.id\" *ngFor=\"let zone of _zones\">{{zone.name}}</option>\n                            </select>\n                            <small [hidden]=\"form.controls.zone_id.pristine || !form.controls.zone_id.hasError('required')\" class=\"inputError\">Zone is required.</small>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label>Branch</label>\n                            <select formControlName=\"branch_id\" class=\"form-control\">\n                                <option [value]=\"''\">--Select Branch--</option>\n                                <option [value]=\"branch.id\" *ngFor=\"let branch of _branches\">{{branch.name}}</option>\n                            </select>\n                            <small [hidden]=\"form.controls.branch_id.pristine || !form.controls.branch_id.hasError('required')\" class=\"inputError\">Branch name is required.</small>\n                        </div>\n                        \n                    </div>\n\n                </div>\n\n\n                <button type=\"submit\" class=\"btn btn-info btn-fill pull-left\" [disabled]=\"!form.valid\">{{(_userId>0)?'Edit':'Add'}} User</button>\n                <div class=\"clearfix\"></div>\n            </form>\n        </div>\n    </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [storage_service_1.StorageService, router_1.Router, angular2_notifications_1.NotificationsService, forms_1.FormBuilder, user_service_1.UserService, branch_service_1.BranchService, zones_service_1.ZoneService, router_1.ActivatedRoute])
                ], AddUserComponent);
                return AddUserComponent;
            }());
            exports_1("AddUserComponent", AddUserComponent);
        }
    }
});

//# sourceMappingURL=add-user.component.js.map
