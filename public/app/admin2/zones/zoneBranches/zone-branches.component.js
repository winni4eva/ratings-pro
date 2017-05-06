System.register(['@angular/core', '../zones.service', '../../branch/branch.service', '@angular/router', 'angular2-notifications'], function(exports_1, context_1) {
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
    var core_1, zones_service_1, branch_service_1, router_1, angular2_notifications_1;
    var ZoneBranchesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (zones_service_1_1) {
                zones_service_1 = zones_service_1_1;
            },
            function (branch_service_1_1) {
                branch_service_1 = branch_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            }],
        execute: function() {
            ZoneBranchesComponent = (function () {
                function ZoneBranchesComponent(_branchService, _zoneService, activeRoute, _notification) {
                    this._branchService = _branchService;
                    this._zoneService = _zoneService;
                    this.activeRoute = activeRoute;
                    this._notification = _notification;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                }
                ZoneBranchesComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.activeRoute.params.subscribe(function (params) { return _this._selectedZoneId = params['zoneId']; });
                    this.getZones();
                    this._branchService.getBranches().subscribe(function (result) { return _this._branches = result.branches; }, function (error) { return console.log(error); });
                };
                ZoneBranchesComponent.prototype.addZoneBranch = function (branchId) {
                    var _this = this;
                    this._zoneService.addZoneBranch(branchId, this._selectedZoneId).subscribe(function (result) {
                        _this._notification.success('Success', result.success);
                        _this.getZones();
                    }, function (error) { return console.log(error); });
                };
                ZoneBranchesComponent.prototype.getZones = function () {
                    var _this = this;
                    this._zoneService.getZones().subscribe(function (result) {
                        _this._zones = result.zones;
                        for (var _i = 0, _a = _this._zones; _i < _a.length; _i++) {
                            var zone = _a[_i];
                            if (zone.id == _this._selectedZoneId)
                                _this._zone = zone;
                        }
                    }, function (error) { return console.log(error); });
                };
                ZoneBranchesComponent.prototype.removeBranch = function (branchId) {
                    var _this = this;
                    this._zoneService.removeZoneBranch(branchId, this._selectedZoneId).subscribe(function (result) {
                        _this._notification.success('Success', result.success);
                        _this.getZones();
                    }, function (error) { return console.log(error); });
                };
                ZoneBranchesComponent.prototype.ngOnDestroy = function () {
                };
                ZoneBranchesComponent = __decorate([
                    core_1.Component({
                        selector: 'my-zone-branches',
                        template: "\n        <simple-notifications [options]=\"_options\"></simple-notifications>\n\n        <my-content title=\"Zone Branches\">\n\n            <div class=\"places-buttons\">\n\n                <div class=\"img-thumbnail\" style=\"width:200%\">\n                    \n                    <div class=\"row\" style=\"width:100%\">\n                        <h5 *ngIf=\"_zone?.name\" class=\"text-center\">{{_zone?.name}} Zone Branches</h5>\n                    </div>\n                    \n                    <p *ngIf=\"_zone?.zone_branches?.length == 0\" class=\"text-center\">This zone  has no branches</p>\n\n                    <div *ngFor=\"let branch of _zone?.zone_branches\">\n                        <div class=\"col-md-2\" style=\"margin-right:1px !important\">\n                            \n                            <div class=\"pull-right\">\n                                <span (click)=\"removeBranch(branch?.branch?.id)\">\n                                    <i style=\"font-size:30px;cursor:pointer !important\" class=\"pe-7s-close\"></i>\n                                </span>\n                            </div>\n\n                            <a class=\"btn btn-default btn-block\" style=\"border:2px solid black !important\">{{branch?.branch?.name}}</a>\n                        \n                        </div>\n                    </div>\n                \n                </div>\n\n                <div class=\"img-thumbnail\" style=\"width:200%\">\n                    \n                    <div class=\"row\">\n                        <h5 class=\"text-center\">Branches</h5>\n                    </div>\n                    \n                    <div *ngFor=\"let branch of _branches\">\n                        <div class=\"col-md-2\" style=\"margin-right:1px !important\">\n                            <a class=\"btn btn-default btn-block\" \n                            (click)=\"addZoneBranch(branch?.id)\"\n                            style=\"border:2px solid black !important\">\n                            {{branch?.name}}\n                            </a>\n                        </div>\n                    </div>\n                \n                </div>\n\n            </div>\n\n        </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [branch_service_1.BranchService, zones_service_1.ZoneService, router_1.ActivatedRoute, angular2_notifications_1.NotificationsService])
                ], ZoneBranchesComponent);
                return ZoneBranchesComponent;
            }());
            exports_1("ZoneBranchesComponent", ZoneBranchesComponent);
        }
    }
});

//# sourceMappingURL=zone-branches.component.js.map
