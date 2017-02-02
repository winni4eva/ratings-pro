System.register(['@angular/core', '@angular/forms', '../branch.service', 'angular2-notifications'], function(exports_1, context_1) {
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
    var core_1, forms_1, branch_service_1, angular2_notifications_1;
    var AddBranchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (branch_service_1_1) {
                branch_service_1 = branch_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            }],
        execute: function() {
            AddBranchComponent = (function () {
                function AddBranchComponent(_branchService, _notification) {
                    this._branchService = _branchService;
                    this._notification = _notification;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                }
                AddBranchComponent.prototype.ngOnInit = function () {
                    this.form = new forms_1.FormGroup({
                        name: new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
                    });
                };
                AddBranchComponent.prototype.add = function (model, isValid) {
                    var _this = this;
                    if (!isValid)
                        return;
                    this._branchService.addBranch(model).subscribe(function (result) { return _this._notification.success('Success', result.success); }, function (error) { return _this._notification.error('Error', error); });
                };
                AddBranchComponent = __decorate([
                    core_1.Component({
                        selector: 'my-add-branch',
                        template: "\n   <simple-notifications [options]=\"_options\"></simple-notifications>\n\n   <my-content [title]=\"'Add Branch'\">\n        <div class=\"content\">\n            <form autocomplete=\"off\" [formGroup]=\"form\" (ngSubmit)=\"add(form.value, form.valid)\" novalidate>\n\n                <div class=\"row\">\n                    <div class=\"col-md-6\">\n                        <div class=\"form-group\">\n                            <label>Branch Name</label>\n                            <input type=\"text\" formControlName=\"name\" class=\"form-control\" placeholder=\"Branch name\" value=\"\">\n                            <small [hidden]=\"form.controls.name.pristine || !form.controls.name.hasError('required')\" class=\"inputError\">Branch name is required.</small>\n                        </div>\n                    </div>\n                </div>\n\n\n                <button type=\"submit\" class=\"btn btn-info btn-fill pull-left\" [disabled]=\"!form.valid\">Add Branch</button>\n                <div class=\"clearfix\"></div>\n            </form>\n        </div>\n    </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [branch_service_1.BranchService, angular2_notifications_1.NotificationsService])
                ], AddBranchComponent);
                return AddBranchComponent;
            }());
            exports_1("AddBranchComponent", AddBranchComponent);
        }
    }
});

//# sourceMappingURL=add-branch.component.js.map
