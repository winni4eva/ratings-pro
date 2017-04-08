System.register(['@angular/core', '../user.service', 'angular2-notifications', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, user_service_1, angular2_notifications_1, router_1;
    var ViewUserComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ViewUserComponent = (function () {
                function ViewUserComponent(_userService, _notification, _router) {
                    this._userService = _userService;
                    this._notification = _notification;
                    this._router = _router;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                    this._actionValue = [];
                }
                ViewUserComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userService.getUsers().subscribe(function (result) { return _this._users = result.resource; }, function (error) { return console.log(error); });
                };
                ViewUserComponent.prototype.ngOnDestroy = function () {
                    //
                };
                ViewUserComponent.prototype.action = function (index, userId) {
                    if (!this._actionValue[index])
                        return;
                    if (this._actionValue[index] == 'edit') {
                        var confirmed = confirm("Are you sure you want to edit the selected user");
                        if (confirmed)
                            this._router.navigate([("admin/add_user/" + userId)]);
                    }
                    else if (this._actionValue[index] == 'delete') {
                        var confirmed = confirm("Are you sure you want to remove the selected user");
                        if (confirmed)
                            this.remove(userId);
                    }
                };
                ViewUserComponent.prototype.remove = function (userId) {
                    // this._miscService.removeResponse(responseId)
                    //         .subscribe( 
                    //                         result => 
                    //                             this._notification.success('Success', 'Response removed successfully...')
                    //                             //this._responses = result.responses
                    //                         ,
                    //                         error => this._notification.error('Error', error),
                    //                         () => this.getResponses()
                    //                     );
                };
                ViewUserComponent = __decorate([
                    core_1.Component({
                        selector: 'my-view-survey',
                        template: "\n        <simple-notifications [options]=\"_options\"></simple-notifications>\n\n        <my-content title=\"Users\">\n\n            <div class=\"content table-responsive table-full-width\">\n                <table class=\"table table-hover table-striped\">\n                    <thead>\n                        <th>First Name</th>\n                        <th>Last Name</th>\n                        <th>Email</th>\n                        <th>Company</th>\n                        <!--<th>Number Of branches Attached</th>-->\n                        <th>Role</th>\n                        <th>Action</th>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let user of _users; let i = index\">\n                            <td>{{user?.first_name}}</td>\n                            <td>{{user?.last_name}}</td>\n                            <td>{{user?.email}}</td>\n                            <td>{{user?.company}}</td>\n                            <!--<td>{{user?.branch_user?.length}}</td>-->\n                            <td>{{user?.role}}</td>\n                            <td>\n                                <select class=\"form-control\" [(ngModel)]=\"_actionValue[i]\" (change)=\"action(i, user?.id)\">\n                                    <option value=\"\">--Select Action--</option>\n                                    <option [value]=\"'edit'\">Edit</option>\n                                    <option [value]=\"'delete'\">Delete</option>\n                                </select>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, angular2_notifications_1.NotificationsService, router_1.Router])
                ], ViewUserComponent);
                return ViewUserComponent;
            }());
            exports_1("ViewUserComponent", ViewUserComponent);
        }
    }
});

//# sourceMappingURL=view-user.component.js.map
