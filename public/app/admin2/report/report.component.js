System.register(['@angular/core', './report.service', 'angular2-notifications', '../../shared/file-generator/file.service'], function(exports_1, context_1) {
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
    var core_1, report_service_1, angular2_notifications_1, file_service_1;
    var ReportComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (report_service_1_1) {
                report_service_1 = report_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (file_service_1_1) {
                file_service_1 = file_service_1_1;
            }],
        execute: function() {
            ReportComponent = (function () {
                function ReportComponent(_reportService, _notification, _fileService) {
                    this._reportService = _reportService;
                    this._notification = _notification;
                    this._fileService = _fileService;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                    this.myDatePickerOptions = {
                        todayBtnTxt: 'Today',
                        dateFormat: 'yyyy-mm-dd',
                        firstDayOfWeek: 'mo',
                        sunHighlight: true,
                        height: '34px',
                        width: '260px',
                        inline: false,
                        disableUntil: { year: 2016, month: 8, day: 10 },
                        selectionTxtFontSize: '16px'
                    };
                    this.clickedTab = 'Overview';
                    this.dateFilter = [];
                    this.charts = [
                        {
                            id: 'chart-1',
                            data: {
                                title: {
                                    "text": "Surveys & Responses",
                                    "font-size": "24px",
                                    "adjust-layout": true
                                },
                                plotarea: {
                                    "margin": "dynamic 45 60 dynamic",
                                },
                                legend: {
                                    "layout": "float",
                                    "background-color": "none",
                                    "border-width": 0,
                                    "shadow": 0,
                                    "align": "center",
                                    "adjust-layout": true,
                                    "item": {
                                        "padding": 7,
                                        "marginRight": 17,
                                        "cursor": "hand"
                                    }
                                },
                                "type": "line",
                                "series": [
                                    { "values": [20, 40, 25, 50, 15, 45, 33, 34] },
                                    { "values": [5, 30, 21, 18, 59, 50, 28, 33] },
                                    { "values": [30, 5, 18, 21, 33, 41, 29, 15] }
                                ]
                            },
                            height: 600,
                            width: '100%',
                            "scale-x": {
                                "values": "0:35:7",
                                "format": "Day %v"
                            },
                            "scale-y": {
                                "values": "0:100:20",
                                "format": "%v%",
                                "guide": {
                                    "line-style": "dashdot"
                                }
                            }
                        }
                    ];
                    this.stackedbarcharts = [
                        {
                            id: 'chart-4',
                            data: {
                                "type": "bar3d",
                                "plot": {
                                    "stacked": true,
                                    "stack-type": "normal" /* Optional specification */
                                },
                                "series": [
                                    { "values": [20, 40, 25, 50, 15, 45, 33, 34] },
                                    { "values": [5, 30, 21, 18, 59, 50, 28, 33] },
                                    { "values": [30, 5, 18, 21, 33, 41, 29, 15] }
                                ]
                            },
                            height: 600,
                            width: '100%'
                        }
                    ];
                }
                ReportComponent.prototype.ngOnInit = function () {
                    //Fetch Overview Report
                    var obj = {};
                    obj['from'] = '';
                    obj['tab'] = this.clickedTab;
                    obj['to'] = '';
                    this.dateFilter.push(obj);
                    this.getReport(this.dateFilter);
                    this.dateFilter = [];
                };
                ReportComponent.prototype.ngOnDestroy = function () {
                };
                ReportComponent.prototype.getReport = function (filter) {
                    var _this = this;
                    this._reportService.getReport(filter).subscribe(function (result) {
                        if (_this.clickedTab == 'Overview') {
                            _this.barcharts = result.report;
                        }
                        else if (_this.clickedTab == 'Surveys') {
                            _this.piecharts = result.report;
                        }
                        _this._notification.success('Success', 'Reports updated...');
                    }, function (error) { return _this._notification.error('Error', error); });
                };
                ReportComponent.prototype.onDateChanged = function (event, option) {
                    if (new Date(event.jsdate).toLocaleDateString() == "1/1/1970") {
                        this.fromDatePickerSet = '';
                        return;
                    }
                    if (option == 'from') {
                        this.fromDatePickerSet = new Date(event.jsdate).toLocaleDateString();
                    }
                    else if (option == 'to') {
                        var obj = {};
                        obj['from'] = this.fromDatePickerSet;
                        obj['tab'] = this.clickedTab;
                        obj['to'] = new Date(event.jsdate).toLocaleDateString();
                        this.dateFilter.push(obj);
                        //FETCH REPORT
                        this.getReport(this.dateFilter);
                        this.fromDatePickerSet = '';
                        this.dateFilter = [];
                    }
                    //console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
                };
                ReportComponent.prototype.export = function (fileType) {
                    var _this = this;
                    this._notification.info('Info', "Generating " + fileType + " report. This may take long depending on the size of data");
                    this._fileService.generate('surveys', fileType)
                        .subscribe(function (success) { return window.open(_this._fileService.printReport(success.file, fileType)); }, function (error) { return _this._notification.error('Error', "Error generating " + fileType + " report"); });
                };
                ReportComponent.prototype.updateReport = function () {
                    var obj = {};
                    obj['from'] = new Date().toLocaleDateString();
                    obj['tab'] = this.clickedTab;
                    obj['to'] = new Date().toLocaleDateString();
                    this.dateFilter.push(obj);
                    this.getReport(this.dateFilter);
                    this.fromDatePickerSet = '';
                    this.dateFilter = [];
                };
                ReportComponent = __decorate([
                    core_1.Component({
                        selector: 'my-report',
                        template: "\n       <style>\n            #exTab1 .tab-content {\n            color : white;\n            background-color: white;\n            padding : 5px 15px;\n            }\n\n            #exTab2 h3 {\n            color : white;\n            background-color: white;\n            padding : 5px 15px;\n            }\n\n            /* remove border radius for the tab */\n\n            #exTab1 .nav-pills > li > a {\n            border-radius: 0;\n            }\n\n            /* change border radius for the tab , apply corners on top*/\n\n            #exTab3 .nav-pills > li > a {\n            border-radius: 4px 4px 0 0 ;\n            }\n\n            #exTab3 .tab-content {\n            color : white;\n            background-color: white;\n            padding : 5px 15px;\n            }\n       </style>\n          \n          <simple-notifications [options]=\"_options\"></simple-notifications>\n\n          <!--<zingchart [chart]=\"lineChart\"></zingchart>-->\n\n            <my-content [title]=\"'Report'\">\n\n                <div id=\"exTab1\" class=\"\">\t\n                <ul  class=\"nav nav-pills\">\n                    <li class=\"active\">\n                        <a  href=\"#1a\" data-toggle=\"tab\" (click)=\"clickedTab='Overview';updateReport()\">Overview</a>\n                    </li>\n                    <li>\n                        <a href=\"#2a\" data-toggle=\"tab\" (click)=\"clickedTab='Surveys';updateReport()\">Surveys</a>\n                    </li>\n                    <li>\n                        <a href=\"#3a\" data-toggle=\"tab\" (click)=\"clickedTab='Ratings';updateReport()\">Ratings</a>\n                    </li>\n                    <li>\n                        <a href=\"#4a\" data-toggle=\"tab\" (click)=\"clickedTab='Branches';updateReport()\">Branches</a>\n                    </li>\n                </ul>\n\n                <div class=\"img-thumbnail\" style=\"width:200%\">\n                    <my-date-picker [options]=\"myDatePickerOptions\" (dateChanged)=\"onDateChanged($event,'to')\" *ngIf=\"fromDatePickerSet\" class=\"pull-right\"></my-date-picker>\n                    <my-date-picker [options]=\"myDatePickerOptions\" (dateChanged)=\"onDateChanged($event,'from')\" class=\"pull-right\"></my-date-picker>\n                </div>\n\n                <div class=\"tab-content clearfix img-thumbnail\" style=\"width:200%\">\n\n                    <div class=\"tab-pane active\" id=\"1a\" *ngIf=\"clickedTab=='Overview'\">\n                        <zingchart *ngFor=\"let chart of barcharts\" [chart]=\"chart\" ></zingchart>\n                    </div>\n                    \n                    <div class=\"tab-pane\" id=\"2a\" *ngIf=\"clickedTab=='Surveys'\">\n                        <div class=\"pull-right\">\n                            <a (click)=\"export('pdf')\" class=\"btn btn-default\">Export To PDF</a>\n                            <a (click)=\"export('excel')\" class=\"btn btn-default\">Export To Excel</a>\n                        </div>\n                        <zingchart *ngFor=\"let chart of piecharts\" [chart]=\"chart\" ></zingchart>\n                    </div>\n                \n                    <div class=\"tab-pane\" id=\"3a\" *ngIf=\"clickedTab=='Ratings'\">\n                        <zingchart *ngFor=\"let chart of stackedbarcharts\" [chart]=\"chart\" ></zingchart>\n                    </div>\n                    \n                    <div class=\"tab-pane\" id=\"4a\" *ngIf=\"clickedTab=='Branches'\">\n                        <zingchart *ngFor=\"let chart of charts\" [chart]=\"chart\" ></zingchart>\n                    </div>\n\n                </div>\n\n            </div>\n\n        </my-content>\n       "
                    }), 
                    __metadata('design:paramtypes', [report_service_1.ReportService, angular2_notifications_1.NotificationsService, file_service_1.FileService])
                ], ReportComponent);
                return ReportComponent;
            }());
            exports_1("ReportComponent", ReportComponent);
        }
    }
});

//# sourceMappingURL=report.component.js.map
