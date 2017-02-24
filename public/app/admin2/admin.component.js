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
    var Admin2Component;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Admin2Component = (function () {
                function Admin2Component() {
                }
                Admin2Component = __decorate([
                    core_1.Component({
                        selector: 'my-admin',
                        template: "\n    <div class=\"wrapper\">\n        <!-- SideBar -->\n        <my-sidebar [color]=\"_sidBarColor\"></my-sidebar>\n        <!-- SideBar -->\n\n        <div class=\"main-panel\">\n            <!-- Header-->\n            <my-header (sideBarColor)=\"_sidBarColor=$event\"></my-header>\n            <!-- Header -->\n\n            <!-- Content -->\n            <router-outlet></router-outlet>\n            <!-- Content -->\n\n\n            <!-- Footer -->\n            <!--<my-footer></my-footer>-->\n            <!-- Footer -->\n        </div>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Admin2Component);
                return Admin2Component;
            }());
            exports_1("Admin2Component", Admin2Component);
        }
    }
});

//# sourceMappingURL=admin.component.js.map
