System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var SideBarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SideBarComponent = (function () {
                function SideBarComponent() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SideBarComponent.prototype, "link", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SideBarComponent.prototype, "title", void 0);
                SideBarComponent = __decorate([
                    core_1.Component({
                        selector: 'my-sidebar',
                        template: "\n     <!-- sidebar: style can be found in sidebar.less -->\n    <section class=\"sidebar\">\n\n      <!-- sidebar menu: : style can be found in sidebar.less -->\n      <ul class=\"sidebar-menu\">\n       <!-- <li class=\"header\">MAIN NAVIGATION</li>-->\n        <li class=\"treeview\">\n          <a [routerLink]=\"[link]\">\n            <i class=\"fa fa-files-o\"></i>\n            <span>{{title}}</span>\n            <span class=\"pull-right-container\">\n              <span class=\"label label-primary pull-right\">4</span>\n            </span>\n          </a>\n          <ul class=\"treeview-menu\">\n            <li><a href=\"pages/layout/top-nav.html\"><i class=\"fa fa-circle-o\"></i> Top Navigation</a></li>\n            <li><a href=\"pages/layout/boxed.html\"><i class=\"fa fa-circle-o\"></i> Boxed</a></li>\n            <li><a href=\"pages/layout/fixed.html\"><i class=\"fa fa-circle-o\"></i> Fixed</a></li>\n            <li><a href=\"pages/layout/collapsed-sidebar.html\"><i class=\"fa fa-circle-o\"></i> Collapsed Sidebar</a></li>\n          </ul>\n        </li>\n      </ul>\n    </section>\n    <!-- /.sidebar -->\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], SideBarComponent);
                return SideBarComponent;
            }());
            exports_1("SideBarComponent", SideBarComponent);
        }
    }
});

//# sourceMappingURL=sidebar.component.js.map
