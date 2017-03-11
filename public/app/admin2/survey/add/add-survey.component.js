System.register(['@angular/core', '@angular/forms', '../survey.service', '../../branch/branch.service', '../../category/category.service', '../../misc/misc.service', 'angular2-notifications', '../../../shared/validator/conditional-required.service'], function(exports_1, context_1) {
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
    var core_1, forms_1, survey_service_1, branch_service_1, category_service_1, misc_service_1, angular2_notifications_1, conditional_required_service_1;
    var AddSurveyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (survey_service_1_1) {
                survey_service_1 = survey_service_1_1;
            },
            function (branch_service_1_1) {
                branch_service_1 = branch_service_1_1;
            },
            function (category_service_1_1) {
                category_service_1 = category_service_1_1;
            },
            function (misc_service_1_1) {
                misc_service_1 = misc_service_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (conditional_required_service_1_1) {
                conditional_required_service_1 = conditional_required_service_1_1;
            }],
        execute: function() {
            // function answerValidator(ctrl) {
            //     return function(control) {
            //       //console.log('validator');
            //       //console.log(control);
            //       //console.log('checkbox = '+ ctrl.value);
            //       //console.log('control.value = ' + control.value);
            //       let selectbox = ctrl.value;
            //       if(selectbox == '*') return null;
            //       //return {required: true};
            //       return null;
            //     }
            // }
            AddSurveyComponent = (function () {
                function AddSurveyComponent(_surveyService, _fb, _branchService, _catService, _miscService, _notification) {
                    this._surveyService = _surveyService;
                    this._fb = _fb;
                    this._branchService = _branchService;
                    this._catService = _catService;
                    this._miscService = _miscService;
                    this._notification = _notification;
                    this._categoryList = [];
                    this._options = {
                        position: ["top", "right"],
                        timeOut: 9000,
                        lastOnBottom: true
                    };
                    this._questionType = [];
                    this._addQuestionBox = '';
                }
                AddSurveyComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._catService.getCategories().subscribe(function (result) { return _this._categories = result.categories; }, function (error) { return console.log(error); });
                    this._miscService.getResponses().subscribe(function (result) { return _this._responses = result.responses; }, function (error) { return console.log(error); });
                    this.form = this._fb.group({
                        survey: this.initSurvey(),
                        questions: this._fb.array([
                            //this.addQuestion('objective'),
                            this._fb.group({
                                question: ['', forms_1.Validators.required],
                                responses: this._fb.array([
                                    this.initResponse(),
                                ])
                            })
                        ])
                    });
                    this._questionType[0] = 'objective';
                };
                AddSurveyComponent.prototype.add = function (model, isValid) {
                    var _this = this;
                    if (!isValid)
                        return;
                    this._surveyService.addSurvey(model).subscribe(function (result) { return _this._notification.success('Success', result.success); }, function (error) { return _this._notification.error('Error', error); });
                };
                AddSurveyComponent.prototype.initSurvey = function () {
                    return this._fb.group({
                        title: ['', forms_1.Validators.required],
                        category_id: ['', forms_1.Validators.required]
                    });
                };
                AddSurveyComponent.prototype.initQuestion = function (qtnType) {
                    if (qtnType === void 0) { qtnType = 'objective'; }
                    if (qtnType == 'probing')
                        return this.probQuestion();
                    else
                        return this.objectiveQuestion();
                };
                AddSurveyComponent.prototype.objectiveQuestion = function () {
                    return this._fb.group({
                        question: ['', forms_1.Validators.required],
                        responses: this._fb.array([
                            this.initResponse(),
                        ])
                    });
                };
                AddSurveyComponent.prototype.probQuestion = function () {
                    var group = this._fb.group({
                        question_number: ['', forms_1.Validators.required],
                        equality: ['', forms_1.Validators.required],
                        expected_answer: [
                            '',
                            forms_1.Validators.compose([
                                conditional_required_service_1.ConditionalValidator.conditional(function (group) { return group.controls.equality.value != '*'; }, forms_1.Validators.required)
                            ])
                        ],
                        question: ['', forms_1.Validators.required],
                        responses: this._fb.array([
                            this.initResponse(),
                        ])
                    });
                    return group;
                };
                AddSurveyComponent.prototype.initResponse = function () {
                    return this._fb.group({
                        response_id: ['', forms_1.Validators.required]
                    });
                };
                AddSurveyComponent.prototype.addQuestion = function (qtnType) {
                    console.log(qtnType);
                    var control = this.form.controls['questions'];
                    control.push(this.initQuestion(qtnType));
                    this._questionType[control.length - 1] = qtnType;
                };
                AddSurveyComponent.prototype.removeQuestion = function (i) {
                    var control = this.form.controls['questions'];
                    control.removeAt(i);
                };
                AddSurveyComponent.prototype.addResponse = function (parentIndex) {
                    var control = this.form.controls['questions'].controls[parentIndex].controls['responses'];
                    if (control.length === 5) {
                        alert("Limit of 5 responses reached.");
                        return;
                    }
                    control.push(this.initResponse());
                };
                AddSurveyComponent.prototype.removeResponse = function (parentIndex, childIndex) {
                    var control = this.form.controls['questions'].controls[parentIndex].controls['responses'];
                    control.removeAt(childIndex);
                };
                AddSurveyComponent = __decorate([
                    core_1.Component({
                        selector: 'my-add-survey',
                        template: "\n   <simple-notifications [options]=\"_options\"></simple-notifications>\n\n   <my-content [title]=\"'Add Survey'\">\n        <div class=\"content\">\n            <form autocomplete=\"off\" [formGroup]=\"form\" (ngSubmit)=\"add(form.value, form.valid)\" novalidate>\n\n                <div class=\"row\" formGroupName=\"survey\">\n\n                    <div class=\"col-md-4\">\n                        <div class=\"form-group\">\n                            <label>Survey Name</label>\n                            <input type=\"text\" formControlName=\"title\" class=\"form-control\" placeholder=\"Survey name\" value=\"\">\n                            <small [hidden]=\"form.controls.survey.controls.title.pristine || !form.controls.survey.controls.title.hasError('required')\" class=\"inputError\">Survey name is required.</small>\n                        </div>\n                    </div>\n\n                    <div class=\"col-md-4\">\n                        <div class=\"form-group\">\n                            <label>Category</label>\n                            <select class=\"form-control\" formControlName=\"category_id\">\n                                <option *ngFor=\"let category of _categories\" [value]=\"category.id\">{{category.name}}</option>\n                            </select>\n                            <small [hidden]=\"form.controls.survey.controls.category_id.pristine || !form.controls.survey.controls.category_id.hasError('required')\" class=\"inputError\">Category is required.</small>\n                        </div>\n                    </div>\n\n                </div>\n\n                <!-- list of questions -->\n                <div formArrayName=\"questions\" class=\"row\">\n\n                    <div *ngFor=\"let question of form.controls.questions.controls; let i=index\" class=\"img-thumbnail\" style=\"width:200%\">\n\n                        <!-- question header, show remove button when more than one question available -->\n                        \n                        <div class=\"pull-right\">\n                            <span *ngIf=\"i > 0\" \n                                (click)=\"removeQuestion(i)\"><i style=\"font-size:30px;cursor:pointer !important\" class=\"pe-7s-close\"></i>\n                            </span>\n                        </div>\n                        \n                        <h4>Question {{i + 1}} [{{_questionType[i]}}]</h4>\n\n                        <!-- Angular assigns array index as group name by default 0, 1, 2, ... -->\n                        <div [formGroupName]=\"i\" class=\"col-md-12\">\n                            <!-- question -->\n\n                            <div class=\"col-md-2\" *ngIf=\"_questionType[i]=='probing'\">\n                                <div class=\"form-group\" style=\"float:left;margin-top:25px\">\n                                    <a class=\"btn btn-primary btn-fill\" [attr.href]=\"null\">IF</a>\n                                </div>\n                            </div>\n\n                            <div class=\"col-md-4\" *ngIf=\"_questionType[i]=='probing'\">\n                                <div class=\"form-group\">\n                                    <label>Question</label>\n                                    <select class=\"form-control\" formControlName=\"question_number\">\n                                        <option value=\"\">Select Question Number</option>\n                                        <option [value]=\"j\" *ngFor=\"let qtn of form.controls.questions.controls;let j=index\" [hidden]=\"j>=i\">Question {{j+1}}</option>\n                                    </select>\n                                    <small [hidden]=\"form.controls.questions.controls[i].controls.question_number.pristine || !form.controls.questions.controls[i].controls.question_number.hasError('required')\" class=\"inputError\">Question number is required.</small>\n                                </div>\n                            </div>\n\n                            <div class=\"col-md-2\" *ngIf=\"_questionType[i]=='probing'\">\n                                <div class=\"form-group\" style=\"\">\n                                    <label>Equality</label>\n                                    <select class=\"form-control\" formControlName=\"equality\">\n                                        <option value=\"\">Select Equality</option>\n                                        <option [value]=\"'=='\">Is</option>\n                                        <option [value]=\"'!='\">Is Not</option>\n                                        <option [value]=\"'*'\">Any</option>\n                                    </select>\n                                    <small [hidden]=\"form.controls.questions.controls[i].controls.equality.pristine || !form.controls.questions.controls[i].controls.equality.hasError('required')\" class=\"inputError\">Equality is required.</small>\n                                </div>\n                            </div>\n                            \n                            <div class=\"col-md-4\" *ngIf=\"_questionType[i]=='probing'\">\n                                <div class=\"form-group\" [hidden]=\"!form.controls.questions.controls[i].controls.expected_answer.hasError('required')\">\n                                    <label>Answer</label>\n                                    <select class=\"form-control\" formControlName=\"expected_answer\">\n                                        <option value=\"\">Select Answer</option>\n                                        <option *ngFor=\"let response of _responses\" [value]=\"response.id\">{{response.name}}</option>\n                                    </select>\n                                    <small [hidden]=\"form.controls.questions.controls[i].controls.expected_answer.pristine || !form.controls.questions.controls[i].controls.expected_answer.hasError('required')\" class=\"inputError\">Answer is required.</small>\n                                </div>\n                            </div>\n                            \n                            <div class=\"col-md-12\">\n                                <div class=\"form-group\">\n                                    <label>Question</label>\n                                    <textarea rows=\"4\" cols=\"50\" class=\"form-control\" formControlName=\"question\"></textarea>\n                                    \n                                    <small [hidden]=\"form.controls.questions.controls[i].controls.question.pristine || !form.controls.questions.controls[i].controls.question.hasError('required')\" class=\"inputError\">\n                                        Question is required\n                                    </small>\n                                    \n                                </div>\n                            </div>\n\n                            <!-- Start Responses -->\n                            <div formArrayName=\"responses\" class=\"row\">\n\n                                <a class=\"btn btn-primary btn-fill pull-right\" (click)=\"addResponse(i)\">Add Response</a>\n\n                                <div *ngFor=\"let response of question.controls.responses.controls; let j=index\">\n\n                                    <!-- response header, show remove button when more than one question available -->\n\n                                    <!-- Angular assigns array index as group name by default 0, 1, 2, ... -->\n                                    <div [formGroupName]=\"j\" class=\"col-md-2\">\n\n                                        <div class=\"pull-right\">\n                                            <span *ngIf=\"j > 0\" \n                                                (click)=\"removeResponse(i,j)\"><i style=\"font-size:15px;cursor:pointer !important\" class=\"pe-7s-close\"></i>\n                                            </span>\n                                        </div>\n\n                                        <!-- question -->\n                                        <div class=\"form-group\">\n                                            <label>Response {{j + 1}}</label>\n                                            <select class=\"form-control\" formControlName=\"response_id\">\n                                                <option value=\"\">Select Response</option>\n                                                <option *ngFor=\"let response of _responses\" [value]=\"response.id\">{{response.name}}</option>\n                                            </select>\n                                          \n                                            <small [hidden]=\"form.controls.questions.controls[i].controls.responses.controls[j].controls.response_id.pristine || !form.controls.questions.controls[i].controls.responses.controls[j].controls.response_id.hasError('required')\"  class=\"inputError\">\n                                                Response is required\n                                            </small>\n                                            \n                                        </div>\n                                    </div>\n                                    \n                                </div>\n\n                            </div>\n                            <!----- End Responses --->\n\n                        </div>\n                        \n                    </div>\n\n                    <a class=\"btn btn-default btn-fill pull-right\" (click)=\"addQuestion('probing')\">Add Question</a>\n                    <!--<a class=\"btn btn-default btn-fill pull-right\" (click)=\"addQuestion('objective')\">Obj Question</a>-->\n                    <!--\n                    <div class=\"col-md-4 btn-fill pull-right\">\n                        <div class=\"form-group\">\n                            <label>Add Question</label>\n                            <select class=\"btn btn-default btn-fill pull-right\" (change)=\"addQuestion($event.target.value)\">\n                                <option>Select Type</option>\n                                <option value=\"probing\">Probing</option>\n                                <option value=\"objective\">Objective</option>\n                            </select>\n                        </div>\n                    </div>\n                    -->\n                    \n                </div>\n\n                <button type=\"submit\" class=\"btn btn-info btn-fill pull-left\" [disabled]=\"!form.valid\">Add Survey</button>\n                <div class=\"clearfix\"></div>\n            </form>\n        </div>\n    </my-content>\n    "
                    }), 
                    __metadata('design:paramtypes', [survey_service_1.SurveyService, forms_1.FormBuilder, branch_service_1.BranchService, category_service_1.CategoryService, misc_service_1.MiscService, angular2_notifications_1.NotificationsService])
                ], AddSurveyComponent);
                return AddSurveyComponent;
            }());
            exports_1("AddSurveyComponent", AddSurveyComponent);
        }
    }
});

//# sourceMappingURL=add-survey.component.js.map
