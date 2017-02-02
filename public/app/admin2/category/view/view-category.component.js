System.register(['@angular/core', '../category.service'], function(exports_1, context_1) {
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
    var core_1, category_service_1;
    var ViewCategoryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (category_service_1_1) {
                category_service_1 = category_service_1_1;
            }],
        execute: function() {
            ViewCategoryComponent = (function () {
                //private _branchList;
                //private _company;
                function ViewCategoryComponent(_catService) {
                    this._catService = _catService;
                }
                ViewCategoryComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._catService.getCategories().subscribe(function (result) {
                        _this._categories = result.categories;
                    }, function (error) { return console.log(error); });
                };
                ViewCategoryComponent.prototype.ngOnDestroy = function () {
                    //
                };
                ViewCategoryComponent = __decorate([
                    core_1.Component({
                        selector: 'my-view-category',
                        template: "\n        <my-content title=\"Categories\">\n            <div class=\"content table-responsive table-full-width\">\n                <table class=\"table table-hover table-striped\">\n                    <thead>\n                        <th>Category</th>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let category of _categories; let i = index\">\n                            <td>{{category.name}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [category_service_1.CategoryService])
                ], ViewCategoryComponent);
                return ViewCategoryComponent;
            }());
            exports_1("ViewCategoryComponent", ViewCategoryComponent);
        }
    }
});

//# sourceMappingURL=view-category.component.js.map
