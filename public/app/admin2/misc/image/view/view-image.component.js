System.register(['@angular/core', '../../misc.service', 'angular2-notifications'], function(exports_1, context_1) {
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
    var core_1, misc_service_1, angular2_notifications_1;
    var ViewImageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (misc_service_1_1) {
                misc_service_1 = misc_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            }],
        execute: function() {
            ViewImageComponent = (function () {
                function ViewImageComponent(_miscService, _notification) {
                    this._miscService = _miscService;
                    this._notification = _notification;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                }
                ViewImageComponent.prototype.ngOnInit = function () {
                    this.getImages();
                };
                ViewImageComponent.prototype.confirmDelete = function (imageId) {
                    var confirmed = confirm("Are you sure you want to remove the selected image");
                    if (confirmed)
                        this.removeImage(imageId);
                };
                ViewImageComponent.prototype.removeImage = function (imageId) {
                    var _this = this;
                    this._miscService.removeImage(imageId).subscribe(function (res) {
                        console.log(res);
                        _this.getImages();
                        _this._notification.success('Success', "Image removed successfully...");
                    }, function (err) {
                        console.log(err);
                        _this._notification.error('Error', 'Error removing image');
                    });
                };
                ViewImageComponent.prototype.getImages = function () {
                    var _this = this;
                    this._miscService.getImages().subscribe(function (result) {
                        _this._images = result.images;
                    }, function (error) { return console.log(error); });
                };
                ViewImageComponent.prototype.ngOnDestroy = function () {
                    //
                };
                ViewImageComponent = __decorate([
                    core_1.Component({
                        selector: 'my-view-image',
                        template: "\n        <simple-notifications [options]=\"_options\"></simple-notifications>\n        <my-content title=\"Images\">\n            <div class=\"content\">\n                <div class=\"col-md-3 pull-left\" *ngFor=\"let image of _images\">\n                    <div class=\"pull-right\">\n                        <span \n                            (click)=\"confirmDelete(image.id)\"><i style=\"font-size:30px;cursor:pointer !important\" class=\"pe-7s-close\"></i>\n                        </span>\n                    </div>\n                    <img [src]=\"image.src\" class=\"img-thumbnail\" style=\"width:250px;height:250px\"/>\n                </div>\n            </div>\n        </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [misc_service_1.MiscService, angular2_notifications_1.NotificationsService])
                ], ViewImageComponent);
                return ViewImageComponent;
            }());
            exports_1("ViewImageComponent", ViewImageComponent);
        }
    }
});

//# sourceMappingURL=view-image.component.js.map
