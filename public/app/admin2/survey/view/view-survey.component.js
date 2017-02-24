System.register(['@angular/core', '../survey.service', '../../../shared/file-generator/file.service', 'angular2-notifications'], function(exports_1, context_1) {
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
    var core_1, survey_service_1, file_service_1, angular2_notifications_1;
    var ViewSurveyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (survey_service_1_1) {
                survey_service_1 = survey_service_1_1;
            },
            function (file_service_1_1) {
                file_service_1 = file_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            }],
        execute: function() {
            ViewSurveyComponent = (function () {
                function ViewSurveyComponent(_surveyService, _fileService, _notification) {
                    this._surveyService = _surveyService;
                    this._fileService = _fileService;
                    this._notification = _notification;
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                }
                ViewSurveyComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._surveyService.getSurveys().subscribe(function (result) { return _this._surveys = result.surveys; }, function (error) { return console.log(error); });
                };
                ViewSurveyComponent.prototype.export = function (fileType) {
                    var _this = this;
                    this._notification.info('Info', 'Generating survey report. This may take long depending on the size of data');
                    this._fileService.generate('surveys', fileType)
                        .subscribe(function (success) { return window.open(_this._fileService.printReport(success.file, fileType)); }, function (error) { return _this._notification.error('Error', 'Error generating survey report'); });
                };
                ViewSurveyComponent.prototype.ngOnDestroy = function () {
                    //
                };
                ViewSurveyComponent = __decorate([
                    core_1.Component({
                        selector: 'my-view-survey',
                        template: "\n        <simple-notifications [options]=\"_options\"></simple-notifications>\n\n        <my-content title=\"Surveys\">\n\n            <div class=\"content table-responsive table-full-width\">\n                <table class=\"table table-hover table-striped\">\n                    <thead>\n                        <th>Survey</th>\n                        <th>Category</th>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let survey of _surveys; let i = index\">\n                            <td>{{survey?.title}}</td>\n                            <td>{{survey?.category?.name}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [survey_service_1.SurveyService, file_service_1.FileService, angular2_notifications_1.NotificationsService])
                ], ViewSurveyComponent);
                return ViewSurveyComponent;
            }());
            exports_1("ViewSurveyComponent", ViewSurveyComponent);
        }
    }
});

//# sourceMappingURL=view-survey.component.js.map
