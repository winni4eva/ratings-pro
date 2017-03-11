System.register(['@angular/core', '@angular/forms', '../../misc.service', 'angular2-notifications', '../../../../shared/validator/conditional-required.service', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, forms_1, misc_service_1, angular2_notifications_1, conditional_required_service_1, router_1;
    var AddResponseComponent;
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
            },
            function (conditional_required_service_1_1) {
                conditional_required_service_1 = conditional_required_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            //import * as _ from 'lodash';
            AddResponseComponent = (function () {
                function AddResponseComponent(_miscService, _fb, _notification, _activatedRoute) {
                    this._miscService = _miscService;
                    this._fb = _fb;
                    this._notification = _notification;
                    this._activatedRoute = _activatedRoute;
                    this._displayImage = '';
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                }
                AddResponseComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._activatedRoute.params.subscribe(function (params) { return _this._responseId = params['responseId']; });
                    this.form = this._fb.group({
                        name: ['', forms_1.Validators.required],
                        rater: ['', forms_1.Validators.required],
                        //raters: this._fb.group({
                        score: [
                            '',
                            forms_1.Validators.compose([
                                conditional_required_service_1.ConditionalValidator.conditional(function (group) { return group.controls.rater.value == 1; }, forms_1.Validators.required)
                            ])
                        ],
                        image_id: [
                            '',
                            forms_1.Validators.compose([
                                conditional_required_service_1.ConditionalValidator.conditional(function (group) { return group.controls.rater.value == 1; }, forms_1.Validators.required)
                            ])
                        ]
                    });
                    if (this._responseId > 0)
                        this.getResponses(this._responseId);
                    this._miscService.getImages().subscribe(function (result) { return _this._images = result.images; }, function (error) { return console.log(error); });
                };
                AddResponseComponent.prototype.add = function (model, isValid) {
                    var _this = this;
                    if (!isValid)
                        return;
                    this._miscService.addResponse(model, this._responseId).subscribe(function (result) { return _this._notification.success('Success', result.success); }, function (error) { return _this._notification.error('Error', error); });
                };
                AddResponseComponent.prototype.getResponses = function (responseId) {
                    var _this = this;
                    if (responseId === void 0) { responseId = 0; }
                    this._miscService.getResponses(responseId).subscribe(function (result) {
                        _this._responses = result.responses;
                        console.log(_this._responses);
                        _this.initFormGroup(_this.form, {
                            name: _this._responses[0].name,
                            rater: (_this._responses[0].rater) ? 1 : 0,
                            score: (_this._responses[0].rater) ? _this._responses[0].rater.score : undefined,
                            image_id: (_this._responses[0].rater) ? _this._responses[0].rater.image_id : undefined
                        });
                        _this._displayImage = (_this._responses[0].rater) ? _this._responses[0].rater.image.src : undefined;
                        //this.totalItems = result.responses.total;
                    }, function (error) { return _this._notification.error('Error', error); });
                };
                AddResponseComponent.prototype.onChange = function ($event) {
                    for (var _i = 0, _a = this._images; _i < _a.length; _i++) {
                        var image = _a[_i];
                        if (image.id == this.form.controls['image_id'].value)
                            this._displayImage = image.src;
                    }
                };
                AddResponseComponent.prototype.initFormGroup = function (form, data) {
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
                AddResponseComponent.prototype.initFormControl = function (control, value) {
                    control.setValue(value);
                };
                AddResponseComponent = __decorate([
                    core_1.Component({
                        selector: 'my-add-response',
                        template: "\n   <simple-notifications [options]=\"_options\"></simple-notifications>\n\n   <my-content [title]=\"(_responseId>0)? 'Edit Response' : 'Add Response'\">\n        <div class=\"content\">\n            <form autocomplete=\"off\" [formGroup]=\"form\" (ngSubmit)=\"add(form.value, form.valid)\" novalidate>\n\n                <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                        <label>Response</label>\n                        <input type=\"text\" class=\"form-control\" formControlName=\"name\">\n                        <small [hidden]=\"form.controls.name.pristine || !form.controls.name.hasError('required')\" class=\"inputError\">Response name is required.</small>\n                    </div>\n               </div>\n\n               <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                        <label>Rater</label>\n                        <select class=\"form-control\" formControlName=\"rater\">\n                            <option value=\"\" [selected]=\"!form.get('rater').value\">--Select Rater--</option>\n                            <option [value]=\"0\" [selected]=\"form.get('rater').value==0\">No</option>\n                            <option [value]=\"1\" [selected]=\"form.get('rater').value==1\">Yes</option>\n                        </select>\n                        <small [hidden]=\"form.controls.rater.pristine || !form.controls.rater.hasError('required')\" class=\"inputError\">Rater name is required.</small>\n                    </div>\n               </div>\n               <!--<p>{{form.get('rater') | json}}</p>-->\n               <!--<div class=\"row\" formGroupName=\"raters\">-->\n\n                    <div class=\"col-md-6\" *ngIf=\"form.controls.rater.value==1\">\n                        <div class=\"form-group\">\n                            <label>Score</label>\n                            <input type=\"text\" class=\"form-control\" formControlName=\"score\">\n                            <small [hidden]=\"form.controls.score.pristine || !form.controls.score.hasError('required')\" class=\"inputError\">Score is required.</small>\n                        </div>\n                    </div>\n\n                    <div class=\"col-md-6\" *ngIf=\"form.controls.rater.value==1\">\n                            <div class=\"form-group\">\n                                <label>Image</label>\n                                <select formControlName=\"image_id\" class=\"form-control\" (click)=\"onChange($event)\">\n                                    <option *ngFor=\"let image of _images; let i = index\" [value]=\"image.id\" [selected]=\"form.controls.image_id.value==image.id\">\n                                        Image {{i+1}}\n                                    </option>\n                                </select>\n                            </div>\n                    </div>\n              <!--</div>-->\n\n              <div class=\"col-md-3\" *ngIf=\"_displayImage\">\n                <img [src]=\"_displayImage\" class=\"img-thumbnail\" style=\"width:250px;height:250px\"/>\n              </div>\n\n              <div class=\"col-md-12\">\n                <button type=\"submit\" class=\"btn btn-info btn-fill pull-left\" [disabled]=\"!form.valid\">{{(_responseId > 0)? 'Edit' : 'Add'}} Response</button>\n              </div>\n             \n              <div class=\"clearfix\"></div>\n              \n            </form>\n        </div>\n    </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [misc_service_1.MiscService, forms_1.FormBuilder, angular2_notifications_1.NotificationsService, router_1.ActivatedRoute])
                ], AddResponseComponent);
                return AddResponseComponent;
            }());
            exports_1("AddResponseComponent", AddResponseComponent);
        }
    }
});

//# sourceMappingURL=add-response.component.js.map
