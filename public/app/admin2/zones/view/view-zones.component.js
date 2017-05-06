System.register(['@angular/core', '../zones.service', 'angular2-notifications', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, zones_service_1, angular2_notifications_1, router_1;
    var ViewZonesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (zones_service_1_1) {
                zones_service_1 = zones_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ViewZonesComponent = (function () {
                function ViewZonesComponent(_zoneService, _notification, _router) {
                    this._zoneService = _zoneService;
                    this._notification = _notification;
                    this._router = _router;
                    this._zones = [];
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                    this._actionValue = [];
                }
                ViewZonesComponent.prototype.ngOnInit = function () {
                    this.getZones();
                };
                ViewZonesComponent.prototype.ngOnDestroy = function () {
                    //
                };
                ViewZonesComponent.prototype.action = function (index, zoneId) {
                    if (!this._actionValue[index])
                        return;
                    if (this._actionValue[index] == 'edit') {
                        var confirmed = confirm("Are you sure you want to edit the selected zone");
                    }
                    else if (this._actionValue[index] == 'delete') {
                        var confirmed = confirm("Are you sure you want to remove the selected zone");
                        if (confirmed)
                            this.remove(zoneId);
                    }
                };
                ViewZonesComponent.prototype.getZones = function () {
                    var _this = this;
                    this._zoneService.getZones().subscribe(function (result) { return _this._zones = result.zones; }, function (error) { return console.log(error); });
                };
                ViewZonesComponent.prototype.addBranches = function (zoneId) {
                    this._router.navigate([("/admin/zone-branches/" + zoneId)]);
                };
                ViewZonesComponent.prototype.remove = function (zoneId) {
                    var _this = this;
                    this._zoneService.remove(zoneId)
                        .subscribe(function (result) {
                        _this._notification.success('Success', result.success);
                        _this.getZones();
                    }, function (error) { return _this._notification.error('Error', error); });
                };
                ViewZonesComponent = __decorate([
                    core_1.Component({
                        selector: 'my-view-survey',
                        template: "\n        <simple-notifications [options]=\"_options\"></simple-notifications>\n\n        <my-content title=\"Zones\">\n\n            <div class=\"content table-responsive table-full-width\">\n                <table class=\"table table-hover table-striped\">\n                    <thead>\n                        <th>Zone</th>\n                        <th>Number Of Branches</th>\n                        <th>Action</th>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let zone of _zones; let i = index\">\n                            <td>{{zone?.name}}</td>\n                            <td>{{zone?.zone_branches?.length}}</td>\n                            <td><a class=\"btn btn-default\" style=\"pointer:cursor\" (click)=\"addBranches(zone?.id)\">branches</a></td>\n                            <td></td>\n                            <td>\n                                <select class=\"form-control\" [(ngModel)]=\"_actionValue[i]\" (change)=\"action(i, zone?.id)\">\n                                    <option value=\"\">--Select Action--</option>\n                                    <!--<option [value]=\"'edit'\">Edit</option>-->\n                                    <option [value]=\"'delete'\">Delete</option>\n                                </select>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [zones_service_1.ZoneService, angular2_notifications_1.NotificationsService, router_1.Router])
                ], ViewZonesComponent);
                return ViewZonesComponent;
            }());
            exports_1("ViewZonesComponent", ViewZonesComponent);
        }
    }
});

//# sourceMappingURL=view-zones.component.js.map
