"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_googlechart_directive_1 = require("./ng2-googlechart.directive");
var ng2_googlechart_combo_directive_1 = require("./ng2-googlechart-combo.directive");
var Ng2GoogleChartModule = (function () {
    function Ng2GoogleChartModule() {
    }
    Ng2GoogleChartModule = __decorate([
        core_1.NgModule({
            declarations: [
                ng2_googlechart_directive_1.ChartDirective,
                ng2_googlechart_combo_directive_1.ComboChartDirective
            ],
            exports: [
                ng2_googlechart_directive_1.ChartDirective,
                ng2_googlechart_combo_directive_1.ComboChartDirective
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2GoogleChartModule);
    return Ng2GoogleChartModule;
}());
exports.Ng2GoogleChartModule = Ng2GoogleChartModule;
