System.register(['@angular/core', '../../shared/storage/storage.service'], function(exports_1, context_1) {
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
    var core_1, storage_service_1;
    var SideBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            }],
        execute: function() {
            SideBarComponent = (function () {
                function SideBarComponent(_storageService) {
                    this._storageService = _storageService;
                }
                SideBarComponent.prototype.ngOnInit = function () {
                    this._info = (this._storageService.get('rUser')) ?
                        JSON.parse(this._storageService.get('rUser')) : {};
                };
                SideBarComponent.prototype.ngOnDestroy = function () {
                    this._info = '';
                };
                SideBarComponent = __decorate([
                    core_1.Component({
                        selector: 'my-sidebar',
                        template: "\n   <div class=\"sidebar\" data-color=\"purple\" data-image=\"assets/img/sidebar-5.jpg\">\n\n    <!--\n\n        Tip 1: you can change the color of the sidebar using: data-color=\"blue | azure | green | orange | red | purple\"\n        Tip 2: you can also add an image using data-image tag\n\n    -->\n\n    \t<div class=\"sidebar-wrapper\">\n            <div class=\"logo\">\n                <a [routerLink]=\"['/home']\" class=\"simple-text\">\n                    {{_info[0]?.company}}\n                </a>\n            </div>\n\n            <ul class=\"nav\">\n                <li class=\"active\">\n                    <a [routerLink]=\"['/admin/view_surveys']\">\n                        <i class=\"pe-7s-graph\"></i>\n                        <p>Surveys</p>\n                    </a>\n                </li>\n                <li class=\"\">\n                    <a [routerLink]=\"['/admin/add_survey']\">\n                        <i class=\"pe-7s-graph\"></i>\n                        <p>New Survey</p>\n                    </a>\n                </li>\n\n                <li>\n                    <a [routerLink]=\"['/admin/view_branches']\">\n                        <i class=\"pe-7s-user\"></i>\n                        <p>Branches</p>\n                    </a>\n                </li>\n                <li>\n                    <a [routerLink]=\"['/admin/add_branch']\">\n                        <i class=\"pe-7s-user\"></i>\n                        <p>New Branch</p>\n                    </a>\n                </li>\n\n                <li>\n                    <a [routerLink]=\"['/admin/view_categories']\">\n                        <i class=\"pe-7s-note2\"></i>\n                        <p>Categories</p>\n                    </a>\n                </li>\n                <li>\n                    <a [routerLink]=\"['/admin/add_category']\">\n                        <i class=\"pe-7s-note2\"></i>\n                        <p>New Category</p>\n                    </a>\n                </li>\n\n                <li>\n                    <a [routerLink]=\"['/admin/view_responses']\">\n                        <i class=\"pe-7s-news-paper\"></i>\n                        <p>Responses</p>\n                    </a>\n                </li>\n                <li>\n                    <a [routerLink]=\"['/admin/add_response']\">\n                        <i class=\"pe-7s-news-paper\"></i>\n                        <p>New Response</p>\n                    </a>\n                </li>\n\n                <li>\n                    <a [routerLink]=\"['/admin/view_images']\">\n                        <i class=\"pe-7s-science\"></i>\n                        <p>Images</p>\n                    </a>\n                </li>\n                <li>\n                    <a [routerLink]=\"['/admin/add_image']\">\n                        <i class=\"pe-7s-science\"></i>\n                        <p>New Image</p>\n                    </a>\n                </li>\n                <li>\n                    <a [routerLink]=\"['/admin/report']\">\n                        <i class=\"pe-7s-map-marker\"></i>\n                        <p>Reports</p>\n                    </a>\n                </li>\n                <!--\n                <li>\n                    <a href=\"notifications.html\">\n                        <i class=\"pe-7s-bell\"></i>\n                        <p>Notifications</p>\n                    </a>\n                </li>\n\t\t\t\t<li class=\"active-pro\">\n                    <a href=\"upgrade.html\">\n                        <i class=\"pe-7s-rocket\"></i>\n                        <p>Upgrade to PRO</p>\n                    </a>\n                </li>\n                -->\n            </ul>\n    \t</div>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [storage_service_1.StorageService])
                ], SideBarComponent);
                return SideBarComponent;
            }());
            exports_1("SideBarComponent", SideBarComponent);
        }
    }
});

//# sourceMappingURL=sidebar.component.js.map
