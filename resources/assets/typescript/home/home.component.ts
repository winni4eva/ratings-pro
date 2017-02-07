import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../admin2/survey/survey.service';
import { HomeService } from './home.service';
import { CategoryService } from '../admin2/category/category.service';


@Component({
    selector: 'my-home',
    template:
     `
        <style>
            body {
                background: url(../images/bg-body.jpg) repeat left top;
                color: #515151;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14px;
                margin: 0;
                min-width: 960px;
                padding: 0;
                border: 2px solid black;
            }
        </style>

        <body>

        <div id="header">
            <div>
                <div id="logo">
                    <a [routerLink]="['/admin/view_branches']"><img src="images/logo.png" alt="Logo"></a>
                </div>
            </div>
        </div>

	<div id="body" style="">

		<div>
			<div>
				<!-- Content -->
                <div [ngSwitch]="_step">

                    <!-- Step 1 -->
                    <div *ngSwitchCase="1" style="width:100% !important">
                        <ul style="width:90%;height:60%; margin-left:4% !important">
                            <li style="margin:1%;float:left;width:20%;height:50% !important" *ngFor="let category of _categories">
                                <a (click)="getSurveys(category?.id)" style="cursor:pointer">
                                    <!--<h4 style="margin-left:-20px;margin-bottom:-3px">{{category?.name}}</h4>-->
                                    <img [src]="category.image.src" class="img-thumbnail" style="width:500px;height:600px"/>
                                </a>                               
                            </li>
                        </ul>
                    </div>
                    <!-- Step 1 -->

                    <!-- Step 2 -->
                    <div *ngSwitchCase="2">
     
                        <div>
                            <div>
                                <!--
                                <p style="text-align:center">{{(_currentQuestion+1)}} Out Of {{_numberOfQuestions}}</p>
                                -->
                                <p style="font-size:40px">
                                    {{_questions[_currentQuestion]?.question}}
                                </p>
                            </div>
                            
                            <div style="width:150%;margin-top:-180px">
                                    <ul>
                                        <li style="margin:0.1%" *ngFor="let answer of _questions[_currentQuestion]?.answers">
                                            <a (click)="getNextQuestion(answer?.response?.id)" style="cursor:pointer"> 
                                            <img class="img-thumbnail" style="z-index:8" [src]="answer?.response?.rater?.image?.src" alt="Image" *ngIf="answer?.response?.rater"> 
                                            <span>{{answer?.response?.name}}</span>
                                            </a>                               
                                        </li>
                                    </ul>
                            </div>
                        </div>

                        <p><a (click)="previousStep()" style="cursor:pointer">Previous</a></p>
                    </div>
                    <!-- Step 4 -->

                    <!-- Default -->
                    <div *ngSwitchDefault>
                        <p>Default Step</p>
                    </div>
                    <!-- Default -->

                </div>
                <!-- Content -->
			</div>
		</div>
	</div>

    <!--
	<div id="footer">
		<div>
			<div>
			</div>
		</div>
		<p class="footnote">
			&copy; Copyright KRIF. All rights reserved.
		</p>
	</div>
    -->
    </body>
    `
})

export class HomeComponent implements OnInit{

    private _surveys;

    private _categories;

    private _tests: Array<any> = []; 

    private _questions; 

    private _step: number = 1;

    private _surveyId: number;

    //private _selectedBranch: number;

    //private _selectedCategory: number;

    //private _selectedTest: number;

    private _numberOfQuestions: number = 0;

    private _currentQuestion: number = 0;

    protected _previous_answer: number = 0;

    private _ratings = []; 

    private _branchId;

    constructor(
                private _surveyService: SurveyService,
                private _homeService: HomeService,
                private _categoryService: CategoryService){}

    ngOnInit(){

        this._categoryService.getCategories().subscribe(
            result => this._categories = result.categories,
            error => console.log(error)
        );

        this._homeService.getUserSurveys().subscribe(
            result => {
                this._surveys = result.resource.surveys;
                this._branchId = result.resource.branch_id;
            },
            error => console.log(error)
        );
    }

    nextStep(){
        if(this._step < 2){
            //console.log(`Step is ${this._step} move to step 1`); 
            this._step += 1;
        }else {
            this.previousStep();
            //console.log(`Step is ${this._step} add 1 step`);
            //this._step += 1;
        }
    }

    previousStep(){
        if(this._step > 1 ) 
            this._step -= 1;
    }

    getSurveys(categoryId){
        this._tests = [];
        
        for(let survey of this._surveys){
            if(survey.category_id === categoryId){
                this._questions = survey.questions;
                this._surveyId = survey.id;
                this.nextStep();
                return
            }
         }

        alert("This category has no survey's to display");

    }

    getNextQuestion(answerId){
        console.log('You answered a question');
        if(this._questions[this._currentQuestion].probe_questions.length > 0){
            console.log('Found another probe question');
            switch (this._questions[this._currentQuestion].probe_questions[0].equality) {
                case '*':
                    this._questions.forEach((question, index) => {
                        //console.log("Question Key => "+ index);
                        if(question.id == this._questions[this._currentQuestion].probe_questions[0].next_question) {
                            //console.log("Current question => "+ index);
                            this._currentQuestion = index;
                        }
                    });
                    break;
                case '==':
                     if(this._questions[this._currentQuestion].probe_questions[0].expected_answer == answerId){

                        this._questions.forEach((question, index) => {
                            //console.log("Question Key => "+ index);
                            if(question.id == this._questions[this._currentQuestion].probe_questions[0].next_question) {
                                //console.log("Current question => "+ index);
                                this._currentQuestion = index;
                            }
                        });
                    }
                    break;
                case '!=':
                    if(this._questions[this._currentQuestion].probe_questions[0].expected_answer != answerId){

                        this._questions.forEach((question, index) => {
                            //console.log("Question Key => "+ index);
                            if(question.id == this._questions[this._currentQuestion].probe_questions[0].next_question) {
                                //console.log("Current question => "+ index);
                                this._currentQuestion = index;
                            }
                        });
                    }
                    break;
                default:
                    break;
            }

            this._previous_answer = answerId;
            
        }else{

            console.log("This Question Has No Further Probes");
            this._ratings.push(
                 {
                     question_id: this._questions[this._currentQuestion].id,
                     response_id: answerId,
                     previous_response_id: this._previous_answer,
                     branch_id: this._branchId,//ToDO return user branch Id
                     survey_id: this._surveyId
                 }
             );

            //Save rating
            //console.log(this._ratings);
            console.log('Saving Rating');
            //this._ratings=[];
            this._homeService.addRating(this._ratings).subscribe(
                result => {
                    console.log(result.success);
                    alert("Thank you for taking this survey...");
                    this._ratings=[];
                    this._currentQuestion=0;
                    this._step=1;
                },
                error => {
                    console.log(error);
                    alert("There was an error saving your survey please try again or contact IT dept for support..");
                }
            );

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
    }


}

