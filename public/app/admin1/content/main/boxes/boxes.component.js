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
    var BoxesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BoxesComponent = (function () {
                function BoxesComponent() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], BoxesComponent.prototype, "boxColor", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], BoxesComponent.prototype, "boxTitle", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], BoxesComponent.prototype, "boxStat", void 0);
                BoxesComponent = __decorate([
                    core_1.Component({
                        selector: 'my-boxes',
                        template: "\n        <div class=\"col-lg-3 col-xs-6\">\n          <!-- small box -->\n          <div class=\"small-box {{boxColor}}\">\n            <div class=\"inner\">\n              <h3>{{boxStat}}</h3>\n\n              <p>{{boxTitle}}</p>\n            </div>\n            <div class=\"icon\">\n              <i class=\"ion ion-bag\"></i>\n            </div>\n            <a href=\"#\" class=\"small-box-footer\">More info <i class=\"fa fa-arrow-circle-right\"></i></a>\n          </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], BoxesComponent);
                return BoxesComponent;
            }());
            exports_1("BoxesComponent", BoxesComponent);
        }
    }
});

//# sourceMappingURL=boxes.component.js.map
