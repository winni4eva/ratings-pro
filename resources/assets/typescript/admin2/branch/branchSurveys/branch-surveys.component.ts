import { Component, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
///import { StorageService } from '../../shared/storage/storage.service';
import { BranchService } from '../branch.service';
import { SurveyService } from '../../survey/survey.service';
import { ActivatedRoute } from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'my-branch-surveys',
    template:
   `
        <simple-notifications [options]="_options"></simple-notifications>

        <my-content title="Branch Surveys">

            <div class="places-buttons">

                <div class="img-thumbnail" style="width:200%">
                    
                    <div class="row" style="width:100%">
                        <h5 *ngIf="_branch?.name" class="text-center">{{_branch?.name}} Branch Surveys</h5>
                    </div>
                    
                    <p *ngIf="_branch?.surveys.length == 0" class="text-center">This branch  has no surveys</p>

                    <div *ngFor="let survey of _branch?.surveys">
                        <div class="col-md-2" style="margin-right:1px !important">
                            
                            <div class="pull-right">
                                <span (click)="removeSurvey(survey?.id)">
                                    <i style="font-size:30px;cursor:pointer !important" class="pe-7s-close"></i>
                                </span>
                            </div>

                            <a class="btn btn-default btn-block" style="border:2px solid black !important">{{survey?.title}}</a>
                        
                        </div>
                    </div>
                
                </div>

                <div class="img-thumbnail" style="width:200%">
                    
                    <div class="row">
                        <h5 class="text-center">Available Surveys</h5>
                    </div>
                    
                    <div *ngFor="let survey of _surveys">
                        <div class="col-md-2" style="margin-right:1px !important">
                            <a class="btn btn-default btn-block" 
                            (click)="addBranchSurvey(survey?.id)"
                            style="border:2px solid black !important">
                            {{survey?.title}}
                            </a>
                        </div>
                    </div>
                
                </div>

            </div>

        </my-content>
    `
})

export class BranchSurveyComponent implements OnInit, OnDestroy {

    private _selectedBranchId;

    private _branch;

    private _branches;

    private _surveys;

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    };

    constructor(
        private _branchService: BranchService,
        private _surveyService: SurveyService,
        private activeRoute: ActivatedRoute,
        private _notification: NotificationsService){}

    ngOnInit() {

        this.activeRoute.params.subscribe(params => this._selectedBranchId = params['branchId'] );

        this.getBranches();

        this._surveyService.getSurveys().subscribe(
                result => this._surveys = result.surveys,
                error => console.log(error)
        );
    
    }

    addBranchSurvey(surveyId){
        this._branchService.saveBranchSurveys(surveyId, this._selectedBranchId).subscribe(
                result => {
                    this._notification.success('Success', result.success)
                    this.getBranches();
                },
                error => console.log(error)
        );
    }

    getBranches(){
        this._branchService.getBranches().subscribe(
                result => {
                    this._branches = result.branches;
                    for(let branch of this._branches){
                        if(branch.id == this._selectedBranchId) this._branch = branch;
                    }
                },
                error => console.log(error)
        );
    }

    removeSurvey(surveyId){
        this._branchService.removeBranchSurveys(surveyId, this._selectedBranchId).subscribe(
                result => {
                    this._notification.success('Success', result.success);
                    this.getBranches();
                },
                error => console.log(error)
        );
    }

    ngOnDestroy(){
      
    }
 }
