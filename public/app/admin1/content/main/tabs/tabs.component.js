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
    var TabsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TabsComponent = (function () {
                function TabsComponent() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TabsComponent.prototype, "title", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TabsComponent.prototype, "header", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], TabsComponent.prototype, "footer", void 0);
                TabsComponent = __decorate([
                    core_1.Component({
                        selector: 'my-tabs',
                        template: "\n        <style>\n        .tab-height{\n          min-height: 500px !important;\n        }\n        </style>\n         <!-- Tab Box -->\n          <div class=\"box box-primary tab-height\">\n\n            <div class=\"box-header\">\n              <i class=\"ion ion-clipboard\"></i>\n\n              <h3 class=\"box-title\">{{title}}</h3>\n\n              <!-- Pagiantion -->\n              <div class=\"box-tools pull-right\" [innerHTML]=\"header\">\n              </div>\n              <!-- Pagiantion -->\n            </div>\n            <!-- /.box-header -->\n\n            <div class=\"box-body\">\n                <ng-content></ng-content>\n            </div>\n            <!-- /.box-body -->\n            <div class=\"box-footer clearfix\" [innerHTML]=\"footer\">\n              \n            </div>\n          </div>\n          <!-- /Tab Box -->\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], TabsComponent);
                return TabsComponent;
            }());
            exports_1("TabsComponent", TabsComponent);
        }
    }
});

//# sourceMappingURL=tabs.component.js.map
