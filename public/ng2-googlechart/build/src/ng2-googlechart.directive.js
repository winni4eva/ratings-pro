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
var ChartDirective = (function () {
    function ChartDirective(elementRef) {
        this.select = new core_1.EventEmitter();
        this.w = window;
        this.el = elementRef.nativeElement;
        if (!this.w.google) {
            console.error("Hey ! It seems the needed google script was not loaded ?");
        }
        ;
    }
    ChartDirective.prototype.ngOnInit = function () {
        this.prepareDataTable();
    };
    ChartDirective.prototype.prepareDataTable = function () {
        var dataTable = new this.w.google.visualization.DataTable();
        var tempData = new Array();
        this.drawChart(dataTable, tempData);
        dataTable.addRows(tempData);
        this.selectChartType(dataTable);
    };
    ChartDirective.prototype.drawChart = function (dataTable, tempData) {
        if (typeof this.columnTypes !== undefined && typeof this.labels !== undefined && typeof this.data != undefined) {
            for (var _i = 0, _a = this.columnTypes; _i < _a.length; _i++) {
                var c = _a[_i];
                dataTable.addColumn(c.type, c.value);
            }
            if (this.isRole) {
                for (var _b = 0, _c = this.roles; _b < _c.length; _b++) {
                    var role = _c[_b];
                    dataTable.addColumn(role);
                }
                for (var index = 0; index < this.data.length; index++) {
                    tempData.push([this.labels[index], this.data[index], this.roleData[index]]);
                }
            }
            else {
                for (var index = 0; index < this.data.length; index++) {
                    tempData.push([this.labels[index], this.data[index]]);
                }
            }
        }
    };
    ChartDirective.prototype.selectChartType = function (dataTable) {
        var _this = this;
        var chart;
        switch (this.chartType) {
            case "Column":
                chart = (new this.w.google.visualization.ColumnChart(this.el));
                break;
            case "Bar":
                chart = (new this.w.google.visualization.BarChart(this.el));
                break;
            case "Pie":
                chart = (new this.w.google.visualization.PieChart(this.el));
                break;
            case "Donut":
                this.options.pieHole = 0.5;
                chart = (new this.w.google.visualization.PieChart(this.el));
                break;
            case "Line":
                chart = (new this.w.google.visualization.LineChart(this.el));
                break;
            case "Area":
                chart = (new this.w.google.visualization.AreaChart(this.el));
                break;
            case "Geo":
                chart = (new this.w.google.visualization.GeoChart(this.el));
                break;
            case "Histogram":
                chart = (new this.w.google.visualization.Histogram(this.el));
                break;
            default:
                break;
        }
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
    ], ChartDirective.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ChartDirective.prototype, "labels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ChartDirective.prototype, "columnTypes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartDirective.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartDirective.prototype, "chartType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ChartDirective.prototype, "isRole", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ChartDirective.prototype, "roleData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ChartDirective.prototype, "roles", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ChartDirective.prototype, "select", void 0);
    ChartDirective = __decorate([
        core_1.Directive({
            selector: "div[chart]",
            exportAs: 'chart'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ChartDirective);
    return ChartDirective;
}());
exports.ChartDirective = ChartDirective;
