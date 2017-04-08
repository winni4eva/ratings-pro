System.register(['@angular/core', '@angular/router', '../../../shared/storage/storage.service', 'angular2-notifications', '@angular/forms', '../zones.service', '../../branch/branch.service'], function(exports_1, context_1) {
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
    var core_1, router_1, storage_service_1, angular2_notifications_1, forms_1, zones_service_1, branch_service_1;
    var AddZoneComponent;
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
            function (zones_service_1_1) {
                zones_service_1 = zones_service_1_1;
            },
            function (branch_service_1_1) {
                branch_service_1 = branch_service_1_1;
            }],
        execute: function() {
            AddZoneComponent = (function () {
                function AddZoneComponent(_storageService, _router, _notification, _fb, _zoneService, _branchService) {
                    this._storageService = _storageService;
                    this._router = _router;
                    this._notification = _notification;
                    this._fb = _fb;
                    this._zoneService = _zoneService;
                    this._branchService = _branchService;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                }
                AddZoneComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._branchService.getBranches().subscribe(function (result) { return _this._branches = result.branches; }, function (error) { return _this._notification.error('Error', error); });
                    this.form = this._fb.group({
                        name: ['', forms_1.Validators.required],
                        branches: this._fb.array([])
                    });
                };
                AddZoneComponent.prototype.add = function (model, isValid) {
                    var _this = this;
                    //if(!isValid) return;
                    this._zoneService.addZone(model).subscribe(function (result) { return _this._notification.success('Success', result.success); }, function (error) { return console.log(error); } //this._notification.error('Error', error.error)
                     //this._notification.error('Error', error.error)
                    );
                };
                AddZoneComponent.prototype.addBranch = function () {
                    var control = this.form.controls['branches'];
                    var push = true;
                    for (var _i = 0, _a = control.value; _i < _a.length; _i++) {
                        var branch = _a[_i];
                        if (branch.branch_id == this._selectedBranch.id)
                            push = false;
                    }
                    if (push)
                        control.push(this.setBranch(this._selectedBranch.name, this._selectedBranch.id));
                };
                AddZoneComponent.prototype.removeBranch = function (i) {
                    var control = this.form.controls['branches'];
                    control.removeAt(i);
                };
                AddZoneComponent.prototype.setBranch = function (branchName, branchId) {
                    return this._fb.group({
                        name: [branchName],
                        branch_id: [branchId]
                    });
                };
                AddZoneComponent.prototype.getControlValue = function (index, controlName, subIndex, subControlName) {
                    if (subIndex === void 0) { subIndex = -1; }
                    if (subControlName === void 0) { subControlName = ''; }
                    if (subIndex > -1 && subControlName) {
                        return "branches." + index + "." + controlName + "." + subIndex + "." + subControlName;
                    }
                    else if (subIndex < 0 && subControlName) {
                        return "branches." + index + "." + controlName + "." + subControlName;
                    }
                    else {
                        return "branches." + index + "." + controlName;
                    }
                };
                AddZoneComponent = __decorate([
                    core_1.Component({
                        selector: 'my-add-zone',
                        template: "\n   <simple-notifications [options]=\"_options\"></simple-notifications>\n\n   <my-content [title]=\"'Add Zone'\">\n        <div class=\"content\">\n            <form autocomplete=\"off\" [formGroup]=\"form\" (ngSubmit)=\"add(form.value, form.valid)\" novalidate>\n\n                <div class=\"row\">\n\n                    <div class=\"col-md-6\">\n\n                        <div class=\"form-group\">\n                            <label>Zone/Region Name</label>\n                            <input type=\"text\" formControlName=\"name\" class=\"form-control\" placeholder=\"Name\">\n                            <small [hidden]=\"form.controls.name.pristine || !form.controls.name.hasError('required')\" class=\"inputError\">Zone name is required.</small>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label>Add Branches</label>\n                            <select class=\"form-control\" (change)=\"addBranch()\" [(ngModel)]=\"_selectedBranch\" [ngModelOptions]=\"{standalone: true}\">\n                                <option [value]=\"''\">--Select Branch--</option>\n                                <option [ngValue]=\"branch\" *ngFor=\"let branch of _branches\">{{branch.name}}</option>\n                            </select>\n                            <!--<small [hidden]=\"form.controls.branch_id.pristine || !form.controls.branch_id.hasError('required')\" class=\"inputError\">Branch name is required.</small>-->\n                        </div>\n                        \n                    </div>\n\n                    <div class=\"col-md-12\">\n                        <div *ngFor=\"let branch of form.controls.branches.controls; let i=index\">\n\n                            <div class=\"col-md-2\" style=\"margin-right:1px !important\">\n                                \n                                <div class=\"pull-right\">\n                                    <span (click)=\"removeBranch(i)\">\n                                        <i style=\"font-size:30px;cursor:pointer !important\" class=\"pe-7s-close\"></i>\n                                    </span>\n                                </div>\n\n                                <a class=\"btn btn-default btn-block\" style=\"border:2px solid black !important\">{{form.get(getControlValue(i,'name')).value}}</a>\n                            \n                            </div>\n\n                        </div>\n\n                    </div>\n\n                </div>\n\n\n                <button type=\"submit\" class=\"btn btn-info btn-fill pull-left\" [disabled]=\"!form.valid\">Add Zone</button>\n                <div class=\"clearfix\"></div>\n            </form>\n        </div>\n    </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [storage_service_1.StorageService, router_1.Router, angular2_notifications_1.NotificationsService, forms_1.FormBuilder, zones_service_1.ZoneService, branch_service_1.BranchService])
                ], AddZoneComponent);
                return AddZoneComponent;
            }());
            exports_1("AddZoneComponent", AddZoneComponent);
        }
    }
});

//# sourceMappingURL=add-zone.component.js.map
