System.register(['@angular/core', '@angular/forms', '../category.service', '../../branch/branch.service', 'angular2-notifications', '../../misc/misc.service'], function(exports_1, context_1) {
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
    var core_1, forms_1, category_service_1, branch_service_1, angular2_notifications_1, misc_service_1;
    var AddCategoryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (category_service_1_1) {
                category_service_1 = category_service_1_1;
            },
            function (branch_service_1_1) {
                branch_service_1 = branch_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (misc_service_1_1) {
                misc_service_1 = misc_service_1_1;
            }],
        execute: function() {
            AddCategoryComponent = (function () {
                function AddCategoryComponent(_categoryService, _branchService, _notification, _miscService) {
                    this._categoryService = _categoryService;
                    this._branchService = _branchService;
                    this._notification = _notification;
                    this._miscService = _miscService;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                }
                AddCategoryComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._branchService.getBranches().subscribe(function (result) {
                        _this._branches = result.branches;
                    }, function (error) { return console.log(error); });
                    this._miscService.getImages().subscribe(function (result) { return _this._images = result.images; }, function (error) { return console.log(error); });
                    this.form = new forms_1.FormGroup({
                        name: new forms_1.FormControl('', [forms_1.Validators.required]),
                        image_id: new forms_1.FormControl('', [forms_1.Validators.required])
                    });
                };
                AddCategoryComponent.prototype.add = function (model, isValid) {
                    var _this = this;
                    if (!isValid)
                        return;
                    this._categoryService.addCategory(model).subscribe(function (result) {
                        console.log(result);
                        _this._notification.success('Success', result.message);
                    }, function (error) { return _this._notification.error('Error', error); });
                };
                AddCategoryComponent.prototype.onChange = function ($event) {
                    for (var _i = 0, _a = this._images; _i < _a.length; _i++) {
                        var image = _a[_i];
                        //console.log(image);
                        if (image.id == this.form.controls['image_id'].value)
                            this._displayImage = image.src;
                    }
                };
                AddCategoryComponent = __decorate([
                    core_1.Component({
                        selector: 'my-add-category',
                        template: "\n   <simple-notifications [options]=\"_options\"></simple-notifications>\n\n   <my-content [title]=\"'Add Category'\">\n        <div class=\"content\">\n            <form autocomplete=\"off\" [formGroup]=\"form\" (ngSubmit)=\"add(form.value, form.valid)\" novalidate>\n\n                <div class=\"row\">\n\n                    <div class=\"col-md-6\">\n                        <div class=\"form-group\">\n                            <label>Category Name</label>\n                            <input type=\"text\" formControlName=\"name\" class=\"form-control\" placeholder=\"Category name\" value=\"\">\n                            <small [hidden]=\"form.controls.name.pristine || !form.controls.name.hasError('required')\" class=\"inputError\">Category name is required.</small>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                        <label>Image</label>\n                        <select formControlName=\"image_id\" class=\"form-control\" (click)=\"onChange($event)\">\n                            <option *ngFor=\"let image of _images; let i = index\" value=\"{{image.id}}\">\n                                Image {{i+1}}\n                            </option>\n                        </select>\n                    </div>\n              </div>\n\n              <div class=\"col-md-3\" *ngIf=\"_displayImage\">\n                <img [src]=\"_displayImage\" class=\"img-thumbnail\" style=\"width:250px;height:250px\"/>\n              </div>\n\n              <div class=\"col-md-12\">\n                <button type=\"submit\" class=\"btn btn-info btn-fill pull-left\" [disabled]=\"!form.valid\">Add Category</button>\n              </div>\n\n            <div class=\"clearfix\"></div>\n            </form>\n        </div>\n    </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [category_service_1.CategoryService, branch_service_1.BranchService, angular2_notifications_1.NotificationsService, misc_service_1.MiscService])
                ], AddCategoryComponent);
                return AddCategoryComponent;
            }());
            exports_1("AddCategoryComponent", AddCategoryComponent);
        }
    }
});

//# sourceMappingURL=add-category.component.js.map
