System.register(['@angular/core', './report.service', 'angular2-notifications', '../../shared/file-generator/file.service', '../branch/branch.service', '../survey/survey.service'], function(exports_1, context_1) {
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
    var core_1, report_service_1, angular2_notifications_1, file_service_1, branch_service_1, survey_service_1;
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
            },
            function (branch_service_1_1) {
                branch_service_1 = branch_service_1_1;
            },
            function (survey_service_1_1) {
                survey_service_1 = survey_service_1_1;
            }],
        execute: function() {
            ReportComponent = (function () {
                //@Input('taxonomySeparator') taxonomy_seperator: string;
                function ReportComponent(_reportService, _notification, _fileService, _branchService, _surveyService) {
                    this._reportService = _reportService;
                    this._notification = _notification;
                    this._fileService = _fileService;
                    this._branchService = _branchService;
                    this._surveyService = _surveyService;
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
                    this._tabOptions = {
                        'Overview': 'raw',
                        'Surveys': 'raw',
                        'Ratings': 'raw',
                        'Branches': 'raw'
                    };
                    this.dateFilter = [];
                    this.overViewtable = [];
                    this.ratingsbarcharts = [];
                    this._ratingsTable = [];
                    this._branchesTable = [];
                    this._overviewItemsPerpage = 10;
                    this._ratingsItemsPerPage = 10;
                }
                ReportComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._branchService.getBranches().subscribe(function (result) { return _this._branches = result.branches; }, function (error) { return _this._notification.error('Error', error); });
                    this._surveyService.getSurveys().subscribe(function (result) { return _this._surveys = result.surveys; }, function (error) { return console.log(error); });
                    //Fetch Overview Report
                    var obj = {};
                    obj['branchId'] = '';
                    obj['surveyId'] = '';
                    obj['from'] = '';
                    obj['tab'] = this.clickedTab;
                    obj['to'] = '';
                    this.dateFilter.push(obj);
                    this.getReport(this.dateFilter);
                    this.dateFilter = [];
                };
                ReportComponent.prototype.ngOnDestroy = function () { };
                ReportComponent.prototype.filter = function (option) {
                    if (option == 'branch') {
                        var obj = {};
                        obj['branchId'] = this.selectedBranchId;
                        obj['surveyId'] = '';
                        obj['tab'] = this.clickedTab;
                        obj['to'] = '';
                        obj['from'] = '';
                        this.dateFilter.push(obj);
                        this.getReport(this.dateFilter);
                        this.dateFilter = [];
                    }
                    else if (option == 'survey') {
                        var obj = {};
                        obj['surveyId'] = this.selectedSurveyId;
                        obj['branchId'] = '';
                        obj['tab'] = this.clickedTab;
                        obj['to'] = '';
                        obj['from'] = '';
                        this.dateFilter.push(obj);
                        this.getReport(this.dateFilter);
                        this.dateFilter = [];
                    }
                };
                ReportComponent.prototype.getReport = function (filter) {
                    var _this = this;
                    this._reportService.getReport(filter).subscribe(function (result) {
                        switch (_this.clickedTab) {
                            case 'Overview':
                                _this.piecharts = result.report;
                                _this.overViewtable = result.raw;
                                break;
                            case 'Branches':
                                _this.barcharts = result.report;
                                _this._branchesTable = result.raw;
                                break;
                            case 'Ratings':
                                _this._ratingsTable = result.raw;
                                _this.ratingsbarcharts = result.report;
                                break;
                            default:
                                break;
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
                        obj['branchId'] = '';
                        obj['surveyId'] = '';
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
                    this._fileService.generate(this.clickedTab, fileType)
                        .subscribe(function (success) { return window.open(_this._fileService.printReport(success.file, fileType)); }, function (error) { return _this._notification.error('Error', "Error generating " + fileType + " report"); });
                };
                ReportComponent.prototype.updateReport = function () {
                    var obj = {};
                    obj['branchId'] = '';
                    obj['surveyId'] = '';
                    obj['from'] = ''; //new Date().toLocaleDateString();
                    obj['tab'] = this.clickedTab;
                    obj['to'] = ''; //new Date().toLocaleDateString();
                    this.dateFilter.push(obj);
                    this.getReport(this.dateFilter);
                    this.fromDatePickerSet = '';
                    this.dateFilter = [];
                };
                ReportComponent.prototype.changeReportType = function (type) {
                    this._tabOptions[this.clickedTab] = type;
                };
                ReportComponent = __decorate([
                    core_1.Component({
                        selector: 'my-report',
                        template: "\n       <style>\n            #exTab1 .tab-content {\n            color : white;\n            background-color: white;\n            padding : 5px 15px;\n            }\n\n            #exTab2 h3 {\n            color : white;\n            background-color: white;\n            padding : 5px 15px;\n            }\n\n            /* remove border radius for the tab */\n\n            #exTab1 .nav-pills > li > a {\n            border-radius: 0;\n            }\n\n            /* change border radius for the tab , apply corners on top*/\n\n            #exTab3 .nav-pills > li > a {\n            border-radius: 4px 4px 0 0 ;\n            }\n\n            #exTab3 .tab-content {\n            color : white;\n            background-color: white;\n            padding : 5px 15px;\n            }\n       </style>\n          \n          <simple-notifications [options]=\"_options\"></simple-notifications>\n\n          <!--<zingchart [chart]=\"lineChart\"></zingchart>-->\n\n            <my-content [title]=\"'Report'\">\n\n                <div id=\"exTab1\" class=\"\">\t\n                <ul  class=\"nav nav-pills\">\n                    <li class=\"active\">\n                        <a  href=\"#1a\" data-toggle=\"tab\" (click)=\"clickedTab='Overview';updateReport()\">Overview</a>\n                    </li>\n\n                    <li>\n                        <a href=\"#3a\" data-toggle=\"tab\" (click)=\"clickedTab='Ratings';updateReport()\">Ratings</a>\n                    </li>\n\n                    <li>\n                        <a href=\"#4a\" data-toggle=\"tab\" (click)=\"clickedTab='Branches';updateReport()\">Branches</a>\n                    </li>\n                    \n                    <!--\n                    <li>\n                        <a href=\"#2a\" data-toggle=\"tab\" (click)=\"clickedTab='Surveys';updateReport()\">Surveys</a>\n                    </li>\n                    -->\n                </ul>\n\n                <div class=\"img-thumbnail\" style=\"width:200%\" *ngIf=\"clickedTab=='Overview'\">\n                    <a class=\"btn btn-primary pull-left\" (click)=\"changeReportType('raw')\">Raw Data</a>\n                    <a class=\"btn btn-primary pull-left\" (click)=\"changeReportType('chart')\">Chart</a>\n\n                    <div class=\"form-group pull-left\" *ngIf=\"this._tabOptions[clickedTab]=='raw'\">\n                        <select class=\"form-control\" [(ngModel)]=\"selectedBranchId\" (change)=\"filter('branch')\">\n                            <option [value]=\"\">--Filter Branch--</option>\n                            <option [value]=\"branch.id\" *ngFor=\"let branch of _branches\">{{branch.name}}</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group pull-left\" *ngIf=\"this._tabOptions[clickedTab]=='raw'\">\n                        <select class=\"form-control\" [(ngModel)]=\"selectedSurveyId\" (change)=\"filter('survey')\">\n                            <option [value]=\"\">--Filter Survey--</option>\n                            <option [value]=\"survey.id\" *ngFor=\"let survey of _surveys\">{{survey.title}}</option>\n                        </select>\n                    </div>\n\n                    <my-date-picker [options]=\"myDatePickerOptions\" (dateChanged)=\"onDateChanged($event,'to')\" *ngIf=\"fromDatePickerSet\" class=\"pull-right\"></my-date-picker>\n                    <my-date-picker [options]=\"myDatePickerOptions\" (dateChanged)=\"onDateChanged($event,'from')\" *ngIf=\"this._tabOptions[clickedTab]=='raw'\" class=\"pull-right\"></my-date-picker>\n                </div>\n\n                <div class=\"img-thumbnail\" style=\"width:200%\" *ngIf=\"clickedTab=='Ratings'\">\n\n                    <a class=\"btn btn-primary pull-left\" (click)=\"changeReportType('raw')\">Raw Data</a>\n                    <a class=\"btn btn-primary pull-left\" (click)=\"changeReportType('chart')\">Chart</a>\n\n                    <div class=\"form-group pull-left\" *ngIf=\"this._tabOptions[clickedTab]=='raw'\">\n                        <select class=\"form-control\" [(ngModel)]=\"selectedBranchId\" (change)=\"filter('branch')\">\n                            <option [value]=\"\">--Filter Branch--</option>\n                            <option [value]=\"branch.id\" *ngFor=\"let branch of _branches\">{{branch.name}}</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group pull-left\" *ngIf=\"this._tabOptions[clickedTab]=='raw'\">\n                        <select class=\"form-control\" [(ngModel)]=\"selectedSurveyId\" (change)=\"filter('survey')\">\n                            <option [value]=\"\">--Filter Survey--</option>\n                            <option [value]=\"survey.id\" *ngFor=\"let survey of _surveys\">{{survey.title}}</option>\n                        </select>\n                    </div>\n\n                    <my-date-picker [options]=\"myDatePickerOptions\" (dateChanged)=\"onDateChanged($event,'to')\" *ngIf=\"fromDatePickerSet\" class=\"pull-right\"></my-date-picker>\n                    <my-date-picker [options]=\"myDatePickerOptions\" (dateChanged)=\"onDateChanged($event,'from')\" *ngIf=\"this._tabOptions[clickedTab]=='raw'\" class=\"pull-right\"></my-date-picker>\n                </div>\n\n                <div class=\"img-thumbnail\" style=\"width:200%\" *ngIf=\"clickedTab=='Branches'\">\n\n                    <a class=\"btn btn-primary pull-left\" (click)=\"changeReportType('raw')\">Raw Data</a>\n                    <a class=\"btn btn-primary pull-left\" (click)=\"changeReportType('chart')\">Chart</a>\n\n                    <div class=\"form-group pull-left\" *ngIf=\"this._tabOptions[clickedTab]=='raw'\">\n                        <select class=\"form-control\" [(ngModel)]=\"selectedBranchId\" (change)=\"filter('branch')\">\n                            <option [value]=\"\">--Filter Branch--</option>\n                            <option [value]=\"branch.id\" *ngFor=\"let branch of _branches\">{{branch.name}}</option>\n                        </select>\n                    </div>\n\n                    <div class=\"form-group pull-left\" *ngIf=\"this._tabOptions[clickedTab]=='raw'\">\n                        <select class=\"form-control\" [(ngModel)]=\"selectedSurveyId\" (change)=\"filter('survey')\">\n                            <option [value]=\"\">--Filter Survey--</option>\n                            <option [value]=\"survey.id\" *ngFor=\"let survey of _surveys\">{{survey.title}}</option>\n                        </select>\n                    </div>\n\n                    <my-date-picker [options]=\"myDatePickerOptions\" (dateChanged)=\"onDateChanged($event,'to')\" *ngIf=\"fromDatePickerSet\" class=\"pull-right\"></my-date-picker>\n                    <my-date-picker [options]=\"myDatePickerOptions\" (dateChanged)=\"onDateChanged($event,'from')\" *ngIf=\"this._tabOptions[clickedTab]=='raw'\" class=\"pull-right\"></my-date-picker>\n                </div>\n\n                <div class=\"tab-content clearfix img-thumbnail\" style=\"width:200%\">\n\n                    <div class=\"tab-pane active\" id=\"1a\" *ngIf=\"clickedTab=='Overview' && _tabOptions[clickedTab]=='chart'\">\n                        <zingchart *ngFor=\"let chart of piecharts\" [chart]=\"chart\" ></zingchart>\n                    </div>\n\n                    <div class=\"tab-pane active\" id=\"1a\" *ngIf=\"clickedTab=='Overview' && _tabOptions[clickedTab]=='raw'\">\n                        <div class=\"content table-responsive table-full-width\">\n\n                            <pagination-controls (pageChange)=\"page = $event\" id=\"1\"\n                                maxSize=\"5\"\n                                directionLinks=\"true\"\n                                autoHide=\"true\"\n                                class=\"pull-right\"\n                                style=\"pointer:cursor\">\n                            </pagination-controls>\n\n                            <div class=\"pull-right\">\n                                <a (click)=\"export('pdf')\" class=\"btn btn-default\">Export To PDF</a>\n                                <!--<a (click)=\"export('excel')\" class=\"btn btn-default\">Export To Excel</a>-->\n                            </div>\n\n                            <div class=\"form-group pull-right\">\n                                <select class=\"form-control\" [(ngModel)]=\"_overviewItemsPerpage\">\n                                    <option [value]=\"10\" [selected]=\"\">--Items Per Page--</option>\n                                    <option [value]=\"10\">10</option>\n                                    <option [value]=\"20\">20</option>\n                                    <option [value]=\"50\">50</option>\n                                    <option [value]=\"100\">100</option>\n                                </select>\n                            </div>\n\n                            <table class=\"table table-hover table-striped\">\n                                <thead>\n                                    <th style=\"color:black\">#</th>\n                                    <th style=\"color:black\">Questionaire</th>\n                                    <th style=\"color:black\">Branch</th>\n                                    <th style=\"color:black\">Question</th>\n                                    <th style=\"color:black\">Answer</th>\n                                    <th style=\"color:black\">Score</th>\n                                    <th style=\"color:black\">Icon</th>\n                                    <th style=\"color:black\">Date Created</th>\n                                </thead>\n                                <tbody>\n                                    <tr *ngFor=\"let data of overViewtable | paginate: {itemsPerPage: _overviewItemsPerpage, currentPage:page, id: '1'};let i=index\">\n                                        <td style=\"color:black\">{{i+1}}</td>\n                                        <td style=\"color:black\">{{data?.title}}</td>\n                                        <td style=\"color:black\">{{data?.name}}</td>\n                                        <td style=\"color:black\">{{data?.question}}</td>\n                                        <td style=\"color:black\">{{data?.responseName}}</td>\n                                        <td style=\"color:black\">{{data?.score}}</td>\n                                        <td style=\"color:black\">\n                                            <img class=\"img-thumbnail\" style=\"width:50px;height:50px\" [src]=\"data?.src\" alt=\"Image\">\n                                        </td>\n                                        <td style=\"color:black\">{{data?.created_at}}</td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                            <pagination-controls (pageChange)=\"page = $event\" id=\"1\"\n                                maxSize=\"5\"\n                                directionLinks=\"true\"\n                                autoHide=\"true\"\n                                class=\"pull-right\"\n                                style=\"pointer:cursor\">\n                            </pagination-controls>\n                        </div>\n                    </div>\n\n                    <div class=\"tab-pane active\" id=\"3a\" *ngIf=\"clickedTab=='Branches' && _tabOptions[clickedTab]=='chart'\">\n                        <zingchart *ngFor=\"let chart of barcharts\" [chart]=\"chart\" ></zingchart>\n                    </div>\n\n                    <div class=\"tab-pane active\" id=\"3a\"  *ngIf=\"clickedTab=='Branches' && _tabOptions[clickedTab]=='raw'\">\n                        \n                        <div class=\"content table-responsive table-full-width\">\n                \n                            <pagination-controls (pageChange)=\"page = $event\" id=\"3\"\n                                maxSize=\"5\"\n                                directionLinks=\"true\"\n                                autoHide=\"true\"\n                                class=\"pull-right\"\n                                style=\"pointer:cursor\">\n                            </pagination-controls>\n                            <!--\n                            <div class=\"pull-right\">\n                                <a (click)=\"export('pdf')\" class=\"btn btn-default\">Export To PDF</a>\n                                <a (click)=\"export('excel')\" class=\"btn btn-default\">Export To Excel</a>\n                            </div>\n                            -->\n                            <div class=\"form-group pull-right\">\n                                <select class=\"form-control\" [(ngModel)]=\"_ratingsItemsPerPage\">\n                                    <option [value]=\"10\" [selected]=\"\">--Items Per Page--</option>\n                                    <option [value]=\"10\">10</option>\n                                    <option [value]=\"20\">20</option>\n                                    <option [value]=\"30\">50</option>\n                                    <option [value]=\"40\">100</option>\n                                </select>\n                            </div>\n\n                            <table class=\"table table-hover table-striped\">\n                                <thead>\n                                    <th style=\"color:black\">#</th>\n                                    <th style=\"color:black\">Branch</th>\n                                    <th style=\"color:black\">Survey</th>\n                                    <th style=\"color:black\">Average Score</th>\n                                    <th style=\"color:black\">Icon</th>\n                                </thead>\n                                <tbody>\n                                    <tr *ngFor=\"let branch of _branchesTable | paginate: {itemsPerPage: _ratingsItemsPerPage, currentPage:page, id: '3'};let i=index\">\n                                        <td style=\"color:black\">{{i+1}}</td>\n                                        <td style=\"color:black\">{{branch?.branch}}</td>\n                                        <td style=\"color:black\">{{branch?.survey}}</td>\n                                        <td style=\"color:black\">{{branch?.averageScore}}</td>\n                                        <td style=\"color:black\">\n                                            <img class=\"img-thumbnail\" style=\"width:50px;height:50px\" [src]=\"branch?.image\" alt=\"Image\">\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                            <pagination-controls (pageChange)=\"page = $event\" id=\"3\"\n                                maxSize=\"5\"\n                                directionLinks=\"true\"\n                                autoHide=\"true\"\n                                class=\"pull-right\"\n                                style=\"pointer:cursor\">\n                            </pagination-controls>\n                        </div>\n                    </div>\n\n                    <div class=\"tab-pane active\" id=\"3a\" *ngIf=\"clickedTab=='Ratings' && _tabOptions[clickedTab]=='chart'\">\n                        <zingchart *ngFor=\"let chart of ratingsbarcharts\" [chart]=\"chart\" ></zingchart>\n                    </div>\n\n                    <div class=\"tab-pane active\" id=\"3a\"  *ngIf=\"clickedTab=='Ratings' && _tabOptions[clickedTab]=='raw'\">\n                        \n                        <div class=\"content table-responsive table-full-width\">\n                \n                            <pagination-controls (pageChange)=\"page = $event\" id=\"2\"\n                                maxSize=\"5\"\n                                directionLinks=\"true\"\n                                autoHide=\"true\"\n                                class=\"pull-right\"\n                                style=\"pointer:cursor\">\n                            </pagination-controls>\n\n                            <div class=\"pull-right\">\n                                <a (click)=\"export('pdf')\" class=\"btn btn-default\">Export To PDF</a>\n                                <!--<a (click)=\"export('excel')\" class=\"btn btn-default\">Export To Excel</a>-->\n                            </div>\n\n                            <div class=\"form-group pull-right\">\n                                <select class=\"form-control\" [(ngModel)]=\"_ratingsItemsPerPage\">\n                                    <option [value]=\"10\" [selected]=\"\">--Items Per Page--</option>\n                                    <option [value]=\"10\">10</option>\n                                    <option [value]=\"20\">20</option>\n                                    <option [value]=\"30\">50</option>\n                                    <option [value]=\"40\">100</option>\n                                </select>\n                            </div>\n\n                            <table class=\"table table-hover table-striped\">\n                                <thead>\n                                    <th style=\"color:black\">#</th>\n                                    <th style=\"color:black\">Survey</th>\n                                    <th style=\"color:black\">Branch</th>\n                                    <th style=\"color:black\">Rater</th>\n                                    <th style=\"color:black\">Rater Score</th>\n                                    <th style=\"color:black\">Total Votes</th>\n                                    <th style=\"color:black\">Average Score</th>\n                                    <th style=\"color:black\">Response Rate (%)</th>\n                                    <th style=\"color:black\">Response Rate (d)</th>\n                                </thead>\n                                <tbody>\n                                    <tr *ngFor=\"let rating of _ratingsTable | paginate: {itemsPerPage: _ratingsItemsPerPage, currentPage:page, id: '2'};let i=index\">\n                                        <td style=\"color:black\">{{i+1}}</td>\n                                        <td style=\"color:black\">{{rating?.survey}}</td>\n                                        <td style=\"color:black\">{{rating?.branch}}</td>\n                                        <td style=\"color:black\">{{rating?.responseName}}</td>\n                                        <td style=\"color:black\">{{rating?.score}}</td>\n                                        <td style=\"color:black\">{{rating?.numberOfResponses}}</td>\n                                        <td style=\"color:black\">{{rating?.averageScore}}</td>\n                                        <td style=\"color:black\">{{rating?.percentageScore}}</td>\n                                        <td style=\"color:black\">{{rating?.decimalScore}}</td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                            <pagination-controls (pageChange)=\"page = $event\" id=\"2\"\n                                maxSize=\"5\"\n                                directionLinks=\"true\"\n                                autoHide=\"true\"\n                                class=\"pull-right\"\n                                style=\"pointer:cursor\">\n                            </pagination-controls>\n                        </div>\n                    </div>\n\n                    <!--\n                    <div class=\"tab-pane\" id=\"2a\" *ngIf=\"clickedTab=='Surveys'\">\n                        <div class=\"pull-right\">\n                            <a (click)=\"export('pdf')\" class=\"btn btn-default\">Export To PDF</a>\n                            <a (click)=\"export('excel')\" class=\"btn btn-default\">Export To Excel</a>\n                        </div>\n                        <zingchart *ngFor=\"let chart of charts\" [chart]=\"chart\" ></zingchart>\n                        <zingchart *ngFor=\"let chart of stackedbarcharts\" [chart]=\"chart\" ></zingchart>\n                    </div>\n                    -->\n\n                </div>\n\n            </div>\n\n        </my-content>\n       "
                    }), 
                    __metadata('design:paramtypes', [report_service_1.ReportService, angular2_notifications_1.NotificationsService, file_service_1.FileService, branch_service_1.BranchService, survey_service_1.SurveyService])
                ], ReportComponent);
                return ReportComponent;
            }());
            exports_1("ReportComponent", ReportComponent);
        }
    }
});

//# sourceMappingURL=report.component.js.map
