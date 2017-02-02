System.register(['@angular/core', '../../misc.service'], function(exports_1, context_1) {
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
    var core_1, misc_service_1;
    var ViewImageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (misc_service_1_1) {
                misc_service_1 = misc_service_1_1;
            }],
        execute: function() {
            ViewImageComponent = (function () {
                function ViewImageComponent(_miscService) {
                    this._miscService = _miscService;
                }
                ViewImageComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._miscService.getImages().subscribe(function (result) {
                        _this._images = result.images;
                        console.log(result.images);
                    }, function (error) { return console.log(error); });
                };
                ViewImageComponent.prototype.ngOnDestroy = function () {
                    //
                };
                ViewImageComponent = __decorate([
                    core_1.Component({
                        selector: 'my-view-image',
                        template: "\n        <my-content title=\"Images\">\n            <div class=\"content\">\n                <div class=\"col-md-3\" *ngFor=\"let image of _images\">\n                    <img [src]=\"image.src\" class=\"img-thumbnail\" style=\"width:250px;height:250px\"/>\n                </div>\n            </div>\n        </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [misc_service_1.MiscService])
                ], ViewImageComponent);
                return ViewImageComponent;
            }());
            exports_1("ViewImageComponent", ViewImageComponent);
        }
    }
});

//# sourceMappingURL=view-image.component.js.map
