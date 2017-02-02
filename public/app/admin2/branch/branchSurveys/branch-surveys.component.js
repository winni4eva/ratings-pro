System.register(['@angular/core', '../branch.service', '../../survey/survey.service', '@angular/router', 'angular2-notifications'], function(exports_1, context_1) {
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
    var core_1, branch_service_1, survey_service_1, router_1, angular2_notifications_1;
    var BranchSurveyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (branch_service_1_1) {
                branch_service_1 = branch_service_1_1;
            },
            function (survey_service_1_1) {
                survey_service_1 = survey_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            }],
        execute: function() {
            BranchSurveyComponent = (function () {
                function BranchSurveyComponent(_branchService, _surveyService, activeRoute, _notification) {
                    this._branchService = _branchService;
                    this._surveyService = _surveyService;
                    this.activeRoute = activeRoute;
                    this._notification = _notification;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                }
                BranchSurveyComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.activeRoute.params.subscribe(function (params) { return _this._selectedBranchId = params['branchId']; });
                    this.getBranches();
                    this._surveyService.getSurveys().subscribe(function (result) { return _this._surveys = result.surveys; }, function (error) { return console.log(error); });
                };
                BranchSurveyComponent.prototype.addBranchSurvey = function (surveyId) {
                    var _this = this;
                    this._branchService.saveBranchSurveys(surveyId, this._selectedBranchId).subscribe(function (result) {
                        _this._notification.success('Success', result.success);
                        _this.getBranches();
                    }, function (error) { return console.log(error); });
                };
                BranchSurveyComponent.prototype.getBranches = function () {
                    var _this = this;
                    this._branchService.getBranches().subscribe(function (result) {
                        _this._branches = result.branches;
                        for (var _i = 0, _a = _this._branches; _i < _a.length; _i++) {
                            var branch = _a[_i];
                            if (branch.id == _this._selectedBranchId)
                                _this._branch = branch;
                        }
                    }, function (error) { return console.log(error); });
                };
                BranchSurveyComponent.prototype.removeSurvey = function (surveyId) {
                    var _this = this;
                    this._branchService.removeBranchSurveys(surveyId, this._selectedBranchId).subscribe(function (result) {
                        _this._notification.success('Success', result.success);
                        _this.getBranches();
                    }, function (error) { return console.log(error); });
                };
                BranchSurveyComponent.prototype.ngOnDestroy = function () {
                };
                BranchSurveyComponent = __decorate([
                    core_1.Component({
                        selector: 'my-branch-surveys',
                        template: "\n        <simple-notifications [options]=\"_options\"></simple-notifications>\n\n        <my-content title=\"Branch Surveys\">\n\n            <div class=\"places-buttons\">\n\n                <div class=\"img-thumbnail\" style=\"width:200%\">\n                    \n                    <div class=\"row\" style=\"width:100%\">\n                        <h5 *ngIf=\"_branch?.name\" class=\"text-center\">{{_branch?.name}} Branch Surveys</h5>\n                    </div>\n                    \n                    <p *ngIf=\"_branch?.surveys.length == 0\" class=\"text-center\">This branch  has no surveys</p>\n\n                    <div *ngFor=\"let survey of _branch?.surveys\">\n                        <div class=\"col-md-2\" style=\"margin-right:1px !important\">\n                            \n                            <div class=\"pull-right\">\n                                <span (click)=\"removeSurvey(survey?.id)\">\n                                    <i style=\"font-size:30px;cursor:pointer !important\" class=\"pe-7s-close\"></i>\n                                </span>\n                            </div>\n\n                            <a class=\"btn btn-default btn-block\" style=\"border:2px solid black !important\">{{survey?.title}}</a>\n                        \n                        </div>\n                    </div>\n                \n                </div>\n\n                <div class=\"img-thumbnail\" style=\"width:200%\">\n                    \n                    <div class=\"row\">\n                        <h5 class=\"text-center\">Available Surveys</h5>\n                    </div>\n                    \n                    <div *ngFor=\"let survey of _surveys\">\n                        <div class=\"col-md-2\" style=\"margin-right:1px !important\">\n                            <a class=\"btn btn-default btn-block\" \n                            (click)=\"addBranchSurvey(survey?.id)\"\n                            style=\"border:2px solid black !important\">\n                            {{survey?.title}}\n                            </a>\n                        </div>\n                    </div>\n                \n                </div>\n\n            </div>\n\n        </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [branch_service_1.BranchService, survey_service_1.SurveyService, router_1.ActivatedRoute, angular2_notifications_1.NotificationsService])
                ], BranchSurveyComponent);
                return BranchSurveyComponent;
            }());
            exports_1("BranchSurveyComponent", BranchSurveyComponent);
        }
    }
});

//# sourceMappingURL=branch-surveys.component.js.map
