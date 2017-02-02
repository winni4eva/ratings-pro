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
    var ContentComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ContentComponent = (function () {
                function ContentComponent() {
                    this.title = 'None';
                    this.column = 'col-md-12';
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ContentComponent.prototype, "title", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ContentComponent.prototype, "column", void 0);
                ContentComponent = __decorate([
                    core_1.Component({
                        selector: 'my-content',
                        template: "\n   <div class=\"content\">\n    <div class=\"container-fluid\">\n         <div class=\"row\">\n            <div class=\"{{column}}\">\n                <div class=\"card\">\n                    <div class=\"header\">\n                        <h4 class=\"title\">{{title}}</h4>\n                        <!--<p class=\"category\">24 Hours performance</p>-->\n                    </div>\n                    <div class=\"content\">\n\n                        <ng-content></ng-content>\n\n                        <div class=\"footer\">\n                            <hr>\n                            <div class=\"stats\">\n                                <i class=\"fa fa-history\"></i> Updated 3 minutes ago\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], ContentComponent);
                return ContentComponent;
            }());
            exports_1("ContentComponent", ContentComponent);
        }
    }
});

//# sourceMappingURL=content.component.js.map
