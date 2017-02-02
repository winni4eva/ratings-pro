System.register(['@angular/core', '@angular/forms', '../../misc.service', 'angular2-notifications'], function(exports_1, context_1) {
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
    var core_1, forms_1, misc_service_1, angular2_notifications_1;
    var AddImageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (misc_service_1_1) {
                misc_service_1 = misc_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            }],
        execute: function() {
            AddImageComponent = (function () {
                function AddImageComponent(_miscService, _fb, _notification) {
                    this._miscService = _miscService;
                    this._fb = _fb;
                    this._notification = _notification;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                }
                AddImageComponent.prototype.ngOnInit = function () {
                    this.form = this._fb.group({
                        image: ['', forms_1.Validators.required]
                    });
                };
                AddImageComponent.prototype.add = function (model, isValid) {
                    var _this = this;
                    if (!this._files)
                        return;
                    this._miscService.addImage(this._files).subscribe(function (result) { return _this._notification.success('Success', result.success); }, function (error) { return _this._notification.error('Error', error); });
                };
                AddImageComponent.prototype.onChange = function (event) {
                    console.log('Image changed');
                    //console.log(this.form.controls['image']);
                    //this.form.controls['image'].setValue('image set');
                    //this.form.controls['image'].setErrors({});
                    var files = event.srcElement.files;
                    this._files = files;
                };
                AddImageComponent = __decorate([
                    core_1.Component({
                        selector: 'my-add-image',
                        template: "\n   <simple-notifications [options]=\"_options\"></simple-notifications>\n\n   <my-content [title]=\"'Add Image'\">\n        <div class=\"content\">\n            <form autocomplete=\"off\" [formGroup]=\"form\" (ngSubmit)=\"add(form.value, form.valid)\" novalidate>\n\n                <div class=\"col-md-12\">\n                    <div class=\"form-group\">\n                        <label>Image</label>\n                        <input type=\"file\" formControlName=\"image\" formControlName=\"image\" class=\"form-control\" placeholder=\"Book Image\" (change)=\"onChange($event)\">\n                        <small [hidden]=\"form.controls.image.pristine || !form.controls.image.hasError('required')\" class=\"inputError\">Image is required.</small>\n                    </div>\n                </div>\n\n                <button type=\"submit\" class=\"btn btn-info btn-fill pull-left\" [disabled]=\"!_files\">Add Image</button>\n                <div class=\"clearfix\"></div>\n            </form>\n        </div>\n    </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [misc_service_1.MiscService, forms_1.FormBuilder, angular2_notifications_1.NotificationsService])
                ], AddImageComponent);
                return AddImageComponent;
            }());
            exports_1("AddImageComponent", AddImageComponent);
        }
    }
});

//# sourceMappingURL=add-image.component.js.map
