System.register(['@angular/core', '@angular/forms', '../cat.service'], function(exports_1, context_1) {
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
    var core_1, forms_1, cat_service_1;
    var AddCategoryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (cat_service_1_1) {
                cat_service_1 = cat_service_1_1;
            }],
        execute: function() {
            AddCategoryComponent = (function () {
                function AddCategoryComponent(_catService, _fb) {
                    this._catService = _catService;
                    this._fb = _fb;
                }
                AddCategoryComponent.prototype.ngOnInit = function () {
                    this._catForm = this._fb.group({
                        name: ['', forms_1.Validators.required]
                    });
                };
                AddCategoryComponent.prototype.addCategory = function (model, isValid) {
                    if (!isValid)
                        return;
                    this._catService.postCategory(model)
                        .subscribe(function (response) {
                        console.log(response);
                    }, function (error) {
                        console.log(error);
                    });
                };
                AddCategoryComponent = __decorate([
                    core_1.Component({
                        selector: 'my-add-category',
                        template: "\n          <div class=\"box box-warning\">\n\n            <!--\n            <div class=\"box-header with-border\">\n              <h3 class=\"box-title\">General Elements</h3>\n            </div>\n            -->\n            \n            <div class=\"box-body\">\n              <form role=\"form\" [formGroup]=\"_catForm\" (ngSubmit)=\"addCategory(_catForm.value, _catForm.valid)\">\n    \n                <div>\n\n                  <label class=\"control-label\" for=\"category\"><i class=\"fa fa-check\"></i>Name</label>\n                  \n                  <input type=\"text\" formControlName=\"name\" class=\"form-control\" id=\"name\" placeholder=\"Enter name\" />\n                  \n                  <span *ngIf=\"_catForm.controls.name.hasError('required')\" class=\"help-block\">Category name is required.</span>\n                  <!--<span *ngIf=\"_catForm.controls.name.dirty && !_catForm.controls.name.hasError('minLength')\" class=\"help-block\">Category name should be at least 3 xters long.</span>-->\n                \n                </div>\n\n                <div class=\"box-footer\">\n                    <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n                </div>\n\n              </form>\n            </div>\n          </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [cat_service_1.CategoryService, forms_1.FormBuilder])
                ], AddCategoryComponent);
                return AddCategoryComponent;
            }());
            exports_1("AddCategoryComponent", AddCategoryComponent);
        }
    }
});

//# sourceMappingURL=add-cat.component.js.map
