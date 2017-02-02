System.register(['@angular/core', '../admin2/survey/survey.service', './home.service', '../admin2/category/category.service'], function(exports_1, context_1) {
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
    var core_1, survey_service_1, home_service_1, category_service_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (survey_service_1_1) {
                survey_service_1 = survey_service_1_1;
            },
            function (home_service_1_1) {
                home_service_1 = home_service_1_1;
            },
            function (category_service_1_1) {
                category_service_1 = category_service_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(_surveyService, _homeService, _categoryService) {
                    this._surveyService = _surveyService;
                    this._homeService = _homeService;
                    this._categoryService = _categoryService;
                    this._tests = [];
                    this._step = 1;
                    //private _selectedBranch: number;
                    //private _selectedCategory: number;
                    //private _selectedTest: number;
                    this._numberOfQuestions = 0;
                    this._currentQuestion = 0;
                    this._previous_answer = 0;
                    this._ratings = [];
                }
                HomeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._categoryService.getCategories().subscribe(function (result) { return _this._categories = result.categories; }, function (error) { return console.log(error); });
                    this._homeService.getUserSurveys().subscribe(function (result) {
                        _this._surveys = result.resource.surveys;
                        _this._branchId = result.resource.branch_id;
                    }, function (error) { return console.log(error); });
                };
                HomeComponent.prototype.nextStep = function () {
                    if (this._step < 2) {
                        //console.log(`Step is ${this._step} move to step 1`); 
                        this._step += 1;
                    }
                    else {
                        this.previousStep();
                    }
                };
                HomeComponent.prototype.previousStep = function () {
                    if (this._step > 1)
                        this._step -= 1;
                };
                HomeComponent.prototype.getSurveys = function (categoryId) {
                    this._tests = [];
                    for (var _i = 0, _a = this._surveys; _i < _a.length; _i++) {
                        var survey = _a[_i];
                        if (survey.category_id === categoryId && survey.active == 1) {
                            this._questions = survey.questions;
                            this._surveyId = survey.id;
                            this.nextStep();
                            return;
                        }
                    }
                    alert("This category has no survey's to display");
                };
                HomeComponent.prototype.getNextQuestion = function (answerId) {
                    var _this = this;
                    console.log('You answered a question');
                    if (this._questions[this._currentQuestion].probe_questions.length > 0) {
                        console.log('Found another probe question');
                        switch (this._questions[this._currentQuestion].probe_questions[0].equality) {
                            case '*':
                                this._questions.forEach(function (question, index) {
                                    //console.log("Question Key => "+ index);
                                    if (question.id == _this._questions[_this._currentQuestion].probe_questions[0].next_question) {
                                        //console.log("Current question => "+ index);
                                        _this._currentQuestion = index;
                                    }
                                });
                                break;
                            case '==':
                                if (this._questions[this._currentQuestion].probe_questions[0].expected_answer == answerId) {
                                    this._questions.forEach(function (question, index) {
                                        //console.log("Question Key => "+ index);
                                        if (question.id == _this._questions[_this._currentQuestion].probe_questions[0].next_question) {
                                            //console.log("Current question => "+ index);
                                            _this._currentQuestion = index;
                                        }
                                    });
                                }
                                break;
                            case '!=':
                                if (this._questions[this._currentQuestion].probe_questions[0].expected_answer != answerId) {
                                    this._questions.forEach(function (question, index) {
                                        //console.log("Question Key => "+ index);
                                        if (question.id == _this._questions[_this._currentQuestion].probe_questions[0].next_question) {
                                            //console.log("Current question => "+ index);
                                            _this._currentQuestion = index;
                                        }
                                    });
                                }
                                break;
                            default:
                                break;
                        }
                        this._previous_answer = answerId;
                    }
                    else {
                        console.log("This Question Has No Further Probes");
                        this._ratings.push({
                            question_id: this._questions[this._currentQuestion].id,
                            response_id: answerId,
                            previous_response_id: this._previous_answer,
                            branch_id: this._branchId,
                            survey_id: this._surveyId
                        });
                        //Save rating
                        //console.log(this._ratings);
                        console.log('Saving Rating');
                        //this._ratings=[];
                        this._homeService.addRating(this._ratings).subscribe(function (result) {
                            console.log(result.success);
                            alert("Thank you for taking this survey...");
                            _this._ratings = [];
                            _this._currentQuestion = 0;
                            _this._step = 1;
                        }, function (error) {
                            console.log(error);
                            alert("There was an error saving your survey please try again or contact IT dept for support..");
                        });
                    }
                    // response_id: answerId,);
                    // let qtnNumber = this._currentQuestion + 1;
                    // if( qtnNumber <= this._numberOfQuestions){
                    //     this._ratings.push(
                    //         {
                    //             question_id: this._questions[this._currentQuestion].id,
                    //             response_id: answerId,
                    //             previous_response_id: answerId,
                    //             branch_id: this._selectedBranch
                    //         }
                    //     );
                    //     this._currentQuestion += 1;
                    //     if(qtnNumber < this._numberOfQuestions) return;
                    // }
                    // this._step = 1;
                    // this._currentQuestion = 0;
                    // this.getCategories(this._selectedBranch);
                    // alert("Thank you for taking this survey..");
                    //Save rating
                    // this._homeService.addRating(this._ratings).subscribe(
                    //     result => {
                    //         console.log(result.success);
                    //         this._ratings=[];
                    //     },
                    //     error => console.log(error)
                    // );
                };
                HomeComponent.prototype.testNextQuestion = function (id) {
                    console.log("Answer is => " + id);
                };
                HomeComponent.prototype.onEvent = function (event) {
                    console.log('Stopping propagation');
                    event.stopPropagation();
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'my-home',
                        template: "\n        <style>\n            body {\n                background: url(../images/bg-body.jpg) repeat left top;\n                color: #515151;\n                font-family: Arial, Helvetica, sans-serif;\n                font-size: 14px;\n                margin: 0;\n                min-width: 960px;\n                padding: 0;\n                border: 2px solid black;\n            }\n        </style>\n\n        <body>\n\n        <div id=\"header\">\n            <div>\n                <div id=\"logo\">\n                    <a [routerLink]=\"['/admin/view_branches']\"><img src=\"images/logo.png\" alt=\"Logo\"></a>\n                </div>\n            </div>\n        </div>\n\n\t<div id=\"body\" style=\"\">\n\n\t\t<div>\n\t\t\t<div>\n\t\t\t\t<!-- Content -->\n                <div [ngSwitch]=\"_step\">\n\n                    <!-- Step 1 -->\n                    <div *ngSwitchCase=\"1\" style=\"width:100% !important\">\n                        <ul style=\"width:90%;height:60%; margin-left:4% !important\">\n                            <li style=\"margin:1%;float:left;width:20%;height:50% !important\" *ngFor=\"let category of _categories\">\n                                <a (click)=\"getSurveys(category?.id)\" style=\"cursor:pointer\">\n                                    <!--<h4 style=\"margin-left:-20px;margin-bottom:-3px\">{{category?.name}}</h4>-->\n                                    <img [src]=\"category.image.src\" class=\"img-thumbnail\" style=\"width:500px;height:600px\"/>\n                                </a>                               \n                            </li>\n                        </ul>\n                    </div>\n                    <!-- Step 1 -->\n\n                    <!-- Step 2 -->\n                    <div *ngSwitchCase=\"2\">\n     \n                        <div>\n                            <div>\n                                <!--\n                                <p style=\"text-align:center\">{{(_currentQuestion+1)}} Out Of {{_numberOfQuestions}}</p>\n                                -->\n                                <p style=\"font-size:40px\">\n                                    {{_questions[_currentQuestion]?.question}}\n                                </p>\n                            </div>\n                            <!--<p><a (change)=\"testNextQuestion(3)\" class=\"btn btn-default\">test</a></p>-->\n                            <div style=\"width:150%;margin-top:-180px\">\n                                    <ul>\n                                        <li style=\"margin:0.1%\" *ngFor=\"let answer of _questions[_currentQuestion]?.answers\">\n                                            <a (click)=\"getNextQuestion(answer?.response?.id);onEvent($event)\" style=\"cursor:pointer\"> \n                                            <img class=\"img-thumbnail\" style=\"z-index:8\" [src]=\"answer?.response?.rater?.image?.src\" alt=\"Image\" *ngIf=\"answer?.response?.rater\"> \n                                            \n                                            <div class=\"btn active\" style=\"margin:0px;border:2px solid black\">\n                                                <input type=\"checkbox\" name='email1' checked style=\"visibility:hidden\"> \n                                                <span>{{answer?.response?.name}}</span>\n                                            </div>\n                                            </a>                               \n                                        </li>\n                                    </ul>\n                            </div>\n                        </div>\n\n                        <p><a (click)=\"previousStep()\" style=\"cursor:pointer\">Previous</a></p>\n                    </div>\n                    <!-- Step 4 -->\n\n                    <!-- Default -->\n                    <div *ngSwitchDefault>\n                        <p>Default Step</p>\n                    </div>\n                    <!-- Default -->\n\n                </div>\n                <!-- Content -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n    <!--\n\t<div id=\"footer\">\n\t\t<div>\n\t\t\t<div>\n\t\t\t</div>\n\t\t</div>\n\t\t<p class=\"footnote\">\n\t\t\t&copy; Copyright KRIF. All rights reserved.\n\t\t</p>\n\t</div>\n    -->\n    </body>\n    "
                    }), 
                    __metadata('design:paramtypes', [survey_service_1.SurveyService, home_service_1.HomeService, category_service_1.CategoryService])
                ], HomeComponent);
                return HomeComponent;
            }());
            exports_1("HomeComponent", HomeComponent);
        }
    }
});

//# sourceMappingURL=home.component.js.map
