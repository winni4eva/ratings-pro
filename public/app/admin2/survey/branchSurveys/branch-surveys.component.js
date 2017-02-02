System.register(['@angular/core', '../survey.service'], function(exports_1, context_1) {
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
    var core_1, survey_service_1;
    var BranchSurveyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (survey_service_1_1) {
                survey_service_1 = survey_service_1_1;
            }],
        execute: function() {
            BranchSurveyComponent = (function () {
                function BranchSurveyComponent(_surveyService) {
                    this._surveyService = _surveyService;
                }
                BranchSurveyComponent.prototype.ngOnInit = function () {
                };
                BranchSurveyComponent.prototype.ngOnDestroy = function () {
                };
                BranchSurveyComponent = __decorate([
                    core_1.Component({
                        selector: 'my-branch-surveys',
                        template: "\n        <my-content title=\"Branch Surveys\">\n            <div class=\"places-buttons\">\n                <div class=\"row\">\n                    <div class=\"col-md-6 col-md-offset-3 text-center\">\n                        <h5>Notifications Places\n                            <p class=\"category\">Click to view notifications</p>\n                        </h5>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-2 col-md-offset-3\">\n                        <button class=\"btn btn-default btn-block\" onclick=\"demo.showNotification('top','left')\">Top Left</button>\n                    </div>\n                    <div class=\"col-md-2\">\n                        <button class=\"btn btn-default btn-block\" onclick=\"demo.showNotification('top','center')\">Top Center</button>\n                    </div>\n                    <div class=\"col-md-2\">\n                        <button class=\"btn btn-default btn-block\" onclick=\"demo.showNotification('top','right')\">Top Right</button>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-2 col-md-offset-3\">\n                        <button class=\"btn btn-default btn-block\" onclick=\"demo.showNotification('bottom','left')\">Bottom Left</button>\n                    </div>\n                    <div class=\"col-md-2\">\n                        <button class=\"btn btn-default btn-block\" onclick=\"demo.showNotification('bottom','center')\">Bottom Center</button>\n                    </div>\n                    <div class=\"col-md-2\">\n                        <button class=\"btn btn-default btn-block\" onclick=\"demo.showNotification('bottom','right')\">Bottom Right</button>\n                    </div>\n                </div>\n            </div>\n        <my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [survey_service_1.SurveyService])
                ], BranchSurveyComponent);
                return BranchSurveyComponent;
            }());
            exports_1("BranchSurveyComponent", BranchSurveyComponent);
        }
    }
});

//# sourceMappingURL=branch-surveys.component.js.map
