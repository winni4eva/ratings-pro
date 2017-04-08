import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { SurveyInterface } from './add-survey.interface';
import { SurveyService } from '../survey.service';
import { BranchService } from '../../branch/branch.service';
import { CategoryService } from '../../category/category.service';
import { MiscService } from '../../misc/misc.service';
import {NotificationsService} from 'angular2-notifications';
import {ConditionalValidator} from '../../../shared/validator/conditional-required.service';

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

@Component({
    selector: 'my-add-survey',
    template:
   `
   <simple-notifications [options]="_options"></simple-notifications>

   <my-content [title]="'Add Survey'">
        <div class="content">
            <form autocomplete="off" [formGroup]="form" (ngSubmit)="add(form.value, form.valid)" novalidate>

                <div class="row" formGroupName="survey">

                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Survey Name</label>
                            <input type="text" formControlName="title" class="form-control" placeholder="Survey name" value="">
                            <small [hidden]="form.controls.survey.controls.title.pristine || !form.controls.survey.controls.title.hasError('required')" class="inputError">Survey name is required.</small>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Category</label>
                            <select class="form-control" formControlName="category_id">
                                <option *ngFor="let category of _categories" [value]="category.id">{{category.name}}</option>
                            </select>
                            <small [hidden]="form.controls.survey.controls.category_id.pristine || !form.controls.survey.controls.category_id.hasError('required')" class="inputError">Category is required.</small>
                        </div>
                    </div>

                </div>

                <!-- list of questions -->
                <div formArrayName="questions" class="row">

                    <div *ngFor="let question of form.controls.questions.controls; let i=index" class="img-thumbnail" style="width:200%">

                        <!-- question header, show remove button when more than one question available -->
                        
                        <div class="pull-right">
                            <span *ngIf="i > 0" 
                                (click)="removeQuestion(i)"><i style="font-size:30px;cursor:pointer !important" class="pe-7s-close"></i>
                            </span>
                        </div>
                        
                        <h4>Question {{i + 1}} [{{_questionType[i]}}]</h4>

                        <!-- Angular assigns array index as group name by default 0, 1, 2, ... -->
                        <div [formGroupName]="i" class="col-md-12">
                            <!-- question -->

                            <div class="col-md-2" *ngIf="_questionType[i]=='probing'">
                                <div class="form-group" style="float:left;margin-top:25px">
                                    <a class="btn btn-primary btn-fill" [attr.href]="null">IF</a>
                                </div>
                            </div>

                            <div class="col-md-4" *ngIf="_questionType[i]=='probing'">
                                <div class="form-group">
                                    <label>Question</label>
                                    <select class="form-control" formControlName="question_number">
                                        <option value="">Select Question Number</option>
                                        <option [value]="j" *ngFor="let qtn of form.controls.questions.controls;let j=index" [hidden]="j>=i">Question {{j+1}}</option>
                                    </select>
                                    <small [hidden]="form.controls.questions.controls[i].controls.question_number.pristine || !form.controls.questions.controls[i].controls.question_number.hasError('required')" class="inputError">Question number is required.</small>
                                </div>
                            </div>

                            <div class="col-md-2" *ngIf="_questionType[i]=='probing'">
                                <div class="form-group" style="">
                                    <label>Equality</label>
                                    <select class="form-control" formControlName="equality">
                                        <option value="">Select Equality</option>
                                        <option [value]="'=='">Is</option>
                                        <option [value]="'!='">Is Not</option>
                                        <option [value]="'*'">Any</option>
                                    </select>
                                    <small [hidden]="form.controls.questions.controls[i].controls.equality.pristine || !form.controls.questions.controls[i].controls.equality.hasError('required')" class="inputError">Equality is required.</small>
                                </div>
                            </div>
                            
                            <div class="col-md-4" *ngIf="_questionType[i]=='probing'">
                                <div class="form-group" [hidden]="!form.controls.questions.controls[i].controls.expected_answer.hasError('required')">
                                    <label>Answer</label>
                                    <select class="form-control" formControlName="expected_answer">
                                        <option value="">Select Answer</option>
                                        <option *ngFor="let response of _responses" [value]="response.id">{{response.name}}</option>
                                    </select>
                                    <small [hidden]="form.controls.questions.controls[i].controls.expected_answer.pristine || !form.controls.questions.controls[i].controls.expected_answer.hasError('required')" class="inputError">Answer is required.</small>
                                </div>
                            </div>
                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Question</label>
                                    <textarea rows="4" cols="50" class="form-control" formControlName="question"></textarea>
                                    
                                    <small [hidden]="form.controls.questions.controls[i].controls.question.pristine || !form.controls.questions.controls[i].controls.question.hasError('required')" class="inputError">
                                        Question is required
                                    </small>
                                    
                                </div>
                            </div>

                            <!-- Start Responses -->
                            <div formArrayName="responses" class="row">

                                <a class="btn btn-primary btn-fill pull-right" (click)="addResponse(i)">Add Response</a>

                                <div *ngFor="let response of question.controls.responses.controls; let j=index">

                                    <!-- response header, show remove button when more than one question available -->

                                    <!-- Angular assigns array index as group name by default 0, 1, 2, ... -->
                                    <div [formGroupName]="j" class="col-md-2">

                                        <div class="pull-right">
                                            <span *ngIf="j > 0" 
                                                (click)="removeResponse(i,j)"><i style="font-size:15px;cursor:pointer !important" class="pe-7s-close"></i>
                                            </span>
                                        </div>

                                        <!-- question -->
                                        <div class="form-group">
                                            <label>Response {{j + 1}}</label>
                                            <select class="form-control" formControlName="response_id">
                                                <option value="">Select Response</option>
                                                <option *ngFor="let response of _responses" [value]="response.id">{{response.name}}</option>
                                            </select>
                                          
                                            <small [hidden]="form.controls.questions.controls[i].controls.responses.controls[j].controls.response_id.pristine || !form.controls.questions.controls[i].controls.responses.controls[j].controls.response_id.hasError('required')"  class="inputError">
                                                Response is required
                                            </small>
                                            
                                        </div>
                                    </div>
                                    
                                </div>

                            </div>
                            <!----- End Responses --->

                        </div>
                        
                    </div>

                    <a class="btn btn-default btn-fill pull-right" (click)="addQuestion('probing')">Add Question</a>
                    <!--<a class="btn btn-default btn-fill pull-right" (click)="addQuestion('objective')">Obj Question</a>-->
                    <!--
                    <div class="col-md-4 btn-fill pull-right">
                        <div class="form-group">
                            <label>Add Question</label>
                            <select class="btn btn-default btn-fill pull-right" (change)="addQuestion($event.target.value)">
                                <option>Select Type</option>
                                <option value="probing">Probing</option>
                                <option value="objective">Objective</option>
                            </select>
                        </div>
                    </div>
                    -->
                    
                </div>

                <button type="submit" class="btn btn-info btn-fill pull-left" [disabled]="!form.valid">Add Survey</button>
                <div class="clearfix"></div>
            </form>
        </div>
    </my-content>
    `
})

export class AddSurveyComponent implements OnInit {

    private form;

    private _branches;

    private _categories;

    private _responses;

    private _categoryList = [];

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    }

    private _questionType = [];

    private _addQuestionBox = '';

    constructor(
                private _surveyService: SurveyService, 
                private _fb: FormBuilder,
                private _branchService: BranchService,
                private _catService: CategoryService,
                private _miscService: MiscService,
                private _notification: NotificationsService){}

     ngOnInit(){

        this._catService.getCategories().subscribe(
            result => this._categories = result.categories,
            error => console.log(error)
        );

        this._miscService.getResponses().subscribe(
            result => this._responses = result.responses,
            error => console.log(error)
        );

        this.form = this._fb.group({
            survey: this.initSurvey(),
            questions: this._fb.array([
                //this.addQuestion('objective'),
                this._fb.group({
                    question: ['', Validators.required],
                    responses: this._fb.array([
                        this.initResponse(),
                    ]) 
                })
            ])
        });

        this._questionType[0]='objective';
        
    }

    add(model: SurveyInterface, isValid){
        if(!isValid) return;
        
        this._surveyService.addSurvey(model).subscribe(
            result => this._notification.success('Success', result.success),
            error => this._notification.error('Error', error)
        );
    }

    initSurvey() {
        return this._fb.group({
            title: ['', Validators.required],
            category_id: ['', Validators.required]
        });
    }

    initQuestion(qtnType = 'objective') {
        if(qtnType=='probing') return this.probQuestion(); 
            else return this.objectiveQuestion();
    }

    objectiveQuestion() {
        return this._fb.group({
            question: ['', Validators.required],
            responses: this._fb.array([
                this.initResponse(),
            ]) 
        });
    }

    probQuestion() {

        const group = this._fb.group({
            question_number: ['', Validators.required],
            equality: ['', Validators.required],
            expected_answer: [
                '',
                Validators.compose([
                    ConditionalValidator.conditional(
                        group => group.controls.equality.value != '*',
                        Validators.required
                    )
                ])
            ],
            question: ['', Validators.required],
            responses: this._fb.array([
                this.initResponse(),
                ]) 
        });

        return group;

    }

    initResponse() {
        return this._fb.group({
            response_id: ['', Validators.required]
        });
    }

    addQuestion(qtnType) {
        //console.log(qtnType);
        const control = <FormArray>this.form.controls['questions'];
        control.push(this.initQuestion(qtnType));
        this._questionType[control.length-1]=qtnType;
    }

    removeQuestion(i: number) {
        const control = <FormArray>this.form.controls['questions'];
        control.removeAt(i);
    }

    addResponse(parentIndex: number) {
        const control = <FormArray>this.form.controls['questions'].controls[parentIndex].controls['responses'];
        // if( control.length === 5 ) {
        //     alert("Limit of 5 responses reached.");
        //     return;
        // }
        control.push(this.initResponse());
    }

    removeResponse(parentIndex: number, childIndex: number) {
        const control = <FormArray>this.form.controls['questions'].controls[parentIndex].controls['responses'];
        control.removeAt(childIndex);
    }

 }
