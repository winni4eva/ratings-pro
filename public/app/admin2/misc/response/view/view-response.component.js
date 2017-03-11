System.register(['@angular/core', '../../misc.service', 'angular2-notifications', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, misc_service_1, angular2_notifications_1, router_1;
    var ViewResponseComponent;
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
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ViewResponseComponent = (function () {
                function ViewResponseComponent(_miscService, _notification, _router) {
                    this._miscService = _miscService;
                    this._notification = _notification;
                    this._router = _router;
                    this._actionValue = [];
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                    this.itemsPerPage = 2;
                    this.totalItems = 0;
                    this.currentPage = 1;
                }
                ViewResponseComponent.prototype.ngOnInit = function () {
                    this.getResponses();
                };
                ViewResponseComponent.prototype.getResponses = function () {
                    var _this = this;
                    this._miscService.getResponses().subscribe(function (result) {
                        _this._responses = result.responses;
                        //this.totalItems = result.responses.total;
                    }, function (error) { return _this._notification.error('Error', error); });
                };
                ViewResponseComponent.prototype.action = function (index, responseId) {
                    if (!this._actionValue[index])
                        return;
                    if (this._actionValue[index] == 'edit') {
                        var confirmed = confirm("Are you sure you want to edit the selected response");
                        if (confirmed)
                            this._router.navigate([("admin/add_response/" + responseId)]);
                    }
                    else if (this._actionValue[index] == 'delete') {
                        var confirmed = confirm("Are you sure you want to remove the selected response");
                        if (confirmed)
                            this.removeBook(responseId);
                    }
                };
                ViewResponseComponent.prototype.removeBook = function (responseId) {
                    var _this = this;
                    this._miscService.removeResponse(responseId)
                        .subscribe(function (result) {
                        return _this._notification.success('Success', 'Response removed successfully...');
                    }, function (error) { return _this._notification.error('Error', error); }, function () { return _this.getResponses(); });
                };
                ViewResponseComponent.prototype.ngOnDestroy = function () {
                    //
                };
                ViewResponseComponent = __decorate([
                    core_1.Component({
                        selector: 'my-view-response',
                        template: "\n        <simple-notifications [options]=\"_options\"></simple-notifications>\n\n        <my-content title=\"Responses\">\n            <div class=\"content table-responsive table-full-width\">\n                <table class=\"table table-hover table-striped\">\n                    <thead>\n                        <th>Name</th>\n                        <th>Score</th>\n                        <th>Image</th>\n                        <th>Action</th>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let response of _responses; let i = index\">\n                            <td>{{response?.name}}</td>\n                            <td>{{response?.rater?.score}}</td>\n                            <td><img [src]=\"response?.rater?.image?.src\" style=\"width:50px;height:50px\"/></td>\n                            <td>\n                                <select class=\"form-control\" [(ngModel)]=\"_actionValue[i]\" (change)=\"action(i, response?.id)\">\n                                    <option value=\"\">--Select Action--</option>\n                                    <option [value]=\"'edit'\">Edit</option>\n                                    <option [value]=\"'delete'\">Delete</option>\n                                </select>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n\n            </div>\n        </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [misc_service_1.MiscService, angular2_notifications_1.NotificationsService, router_1.Router])
                ], ViewResponseComponent);
                return ViewResponseComponent;
            }());
            exports_1("ViewResponseComponent", ViewResponseComponent);
        }
    }
});

//# sourceMappingURL=view-response.component.js.map
