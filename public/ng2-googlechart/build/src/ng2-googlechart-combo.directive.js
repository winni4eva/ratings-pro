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
var core_1 = require("@angular/core");
var ComboChartDirective = (function () {
    function ComboChartDirective(elementRef) {
        this.select = new core_1.EventEmitter();
        this.w = window;
        this.el = elementRef.nativeElement;
        if (!this.w.google) {
            console.error("Hey ! It seems the needed google script was not loaded ?");
        }
        ;
    }
    ComboChartDirective.prototype.ngOnInit = function () {
        this.comboChartData();
    };
    ComboChartDirective.prototype.comboChartData = function () {
        var dataTable = new this.w.google.visualization.DataTable();
        var tempData = new Array();
        this.drawComboChart(dataTable, tempData);
    };
    ComboChartDirective.prototype.drawComboChart = function (dataTable, tempData) {
        var _this = this;
        if (typeof this.columnTypes !== undefined && typeof this.labels !== undefined && typeof this.data != undefined) {
            if (this.isRole) {
                for (var i = 0; i < this.columnTypes.length; i++) {
                    if (i === 0) {
                        dataTable.addColumn(this.columnTypes[i].type, this.columnTypes[i].value);
                    }
                    else {
                        dataTable.addColumn(this.columnTypes[i].type, this.columnTypes[i].value);
                        dataTable.addColumn(this.roles[i - 1]);
                    }
                }
                for (var i = 0; i < this.labels.length; i++) {
                    var item = new Array();
                    item.push(this.labels[i]);
                    for (var j = i; j < this.labels.length; j++) {
                        for (var k = 0; k < this.data.length; k++) {
                            item.push(this.data[k][j]);
                            item.push(this.roleData[k][j]);
                        }
                        break;
                    }
                    tempData.push(item);
                }
            }
            else {
                for (var i = 0; i < this.columnTypes.length; i++) {
                    dataTable.addColumn(this.columnTypes[i].type, this.columnTypes[i].value);
                }
                for (var i = 0; i < this.labels.length; i++) {
                    var item = new Array();
                    item.push(this.labels[i]);
                    for (var j = i; j < this.labels.length; j++) {
                        for (var k = 0; k < this.data.length; k++) {
                            item.push(this.data[k][j]);
                        }
                        break;
                    }
                    tempData.push(item);
                }
            }
        }
        dataTable.addRows(tempData);
        var chart = (new this.w.google.visualization.ColumnChart(this.el));
        chart.draw(dataTable, this.options || {});
        this.w.google.visualization.events.addListener(chart, 'select', function () {
            var selectedData = chart.getSelection();
            var row, item;
            if (selectedData[0]) {
                row = selectedData[0].row;
                item = dataTable.getValue(row, 0);
                _this.select.next(item);
            }
            return _this.select.next;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ComboChartDirective.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ComboChartDirective.prototype, "labels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ComboChartDirective.prototype, "columnTypes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComboChartDirective.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ComboChartDirective.prototype, "chartType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ComboChartDirective.prototype, "isRole", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ComboChartDirective.prototype, "roleData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ComboChartDirective.prototype, "roles", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ComboChartDirective.prototype, "select", void 0);
    ComboChartDirective = __decorate([
        core_1.Directive({
            selector: "div[combo-chart]",
            exportAs: 'combo-chart'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ComboChartDirective);
    return ComboChartDirective;
}());
exports.ComboChartDirective = ComboChartDirective;
