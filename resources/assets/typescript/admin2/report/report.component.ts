import {Component, OnInit, OnDestroy} from '@angular/core';
import { ZingChart } from '../chart/zingchart.component';
import { Chart } from '../chart/chart.model';
import { ReportService } from './report.service';
import { NotificationsService } from 'angular2-notifications';
import { FileService } from '../../shared/file-generator/file.service';
import { BranchService } from '../branch/branch.service';
import { SurveyService } from '../survey/survey.service';

   @Component({
       selector : 'my-report',
       template:  `
       <style>
            #exTab1 .tab-content {
            color : white;
            background-color: white;
            padding : 5px 15px;
            }

            #exTab2 h3 {
            color : white;
            background-color: white;
            padding : 5px 15px;
            }

            /* remove border radius for the tab */

            #exTab1 .nav-pills > li > a {
            border-radius: 0;
            }

            /* change border radius for the tab , apply corners on top*/

            #exTab3 .nav-pills > li > a {
            border-radius: 4px 4px 0 0 ;
            }

            #exTab3 .tab-content {
            color : white;
            background-color: white;
            padding : 5px 15px;
            }
       </style>
          
          <simple-notifications [options]="_options"></simple-notifications>

          <!--<zingchart [chart]="lineChart"></zingchart>-->

            <my-content [title]="'Report'">

                <div id="exTab1" class="">	
                <ul  class="nav nav-pills">
                    <li class="active">
                        <a  href="#1a" data-toggle="tab" (click)="clickedTab='Overview';updateReport()">Overview</a>
                    </li>

                    <li>
                        <a href="#4a" data-toggle="tab" (click)="clickedTab='Branches';updateReport()">Branches</a>
                    </li>

                    <li>
                        <a href="#3a" data-toggle="tab" (click)="clickedTab='Ratings';updateReport()">Ratings</a>
                    </li>
                    
                    <!--
                    <li>
                        <a href="#2a" data-toggle="tab" (click)="clickedTab='Surveys';updateReport()">Surveys</a>
                    </li>
                    -->
                </ul>

                <div class="img-thumbnail" style="width:200%" *ngIf="clickedTab=='Overview'">
                    <a class="btn btn-primary pull-left" (click)="changeReportType('raw')">Raw Data</a>
                    <a class="btn btn-primary pull-left" (click)="changeReportType('chart')">Chart</a>

                    <!--<div class="form-group pull-left" *ngIf="_tabOptions[clickedTab]=='raw'">-->
                    <div class="form-group pull-left">
                        <select class="form-control" [(ngModel)]="selectedBranchId" (change)="filter('branch')">
                            <option [value]="''">--Filter Branch--</option>
                            <option [value]="branch.id" *ngFor="let branch of _branches">{{branch.name}}</option>
                        </select>
                    </div>

                    <!--<div class="form-group pull-left" *ngIf="_tabOptions[clickedTab]=='raw'">-->
                    <div class="form-group pull-left">
                        <select class="form-control" [(ngModel)]="selectedSurveyId" (change)="filter('survey')">
                            <option [value]="''">--Filter Survey--</option>
                            <option [value]="survey.id" *ngFor="let survey of _surveys">{{survey.title}}</option>
                        </select>
                    </div>

                    <div class="form-group pull-left" *ngIf="_tabOptions[clickedTab]=='chart'">
                        <select class="form-control" [(ngModel)]="_chartOptions['Overview']">
                            <option [value]="'pie'">Pie</option>
                            <option [value]="'bar'">Bar</option>
                        </select>
                    </div>

                    <h5 style="color:red;margin-left:2%" class="row" *ngIf="(!overviewbarcharts.length && !overviewpiecharts.length) && _tabOptions[clickedTab]=='chart'">Select A Branch And Survey To Enable Graphical Representation</h5>

                    <my-date-picker [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event,'to')" *ngIf="fromDatePickerSet" class="pull-right"></my-date-picker>
                    <my-date-picker [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event,'from')" *ngIf="this._tabOptions[clickedTab]=='raw'" class="pull-right"></my-date-picker>
                </div>

                <div class="img-thumbnail" style="width:200%" *ngIf="clickedTab=='Ratings'">

                    <a class="btn btn-primary pull-left" (click)="changeReportType('raw')">Raw Data</a>
                    <a class="btn btn-primary pull-left" (click)="changeReportType('chart')">Chart</a>

                    <div class="form-group pull-left" *ngIf="this._tabOptions[clickedTab]=='raw'">
                        <select class="form-control" [(ngModel)]="selectedBranchId" (change)="filter('branch')">
                            <option [value]="''">--Filter Branch--</option>
                            <option [value]="branch.id" *ngFor="let branch of _branches">{{branch.name}}</option>
                        </select>
                    </div>

                    <div class="form-group pull-left" *ngIf="this._tabOptions[clickedTab]=='raw'">
                        <select class="form-control" [(ngModel)]="selectedSurveyId" (change)="filter('survey')">
                            <option [value]="''">--Filter Survey--</option>
                            <option [value]="survey.id" *ngFor="let survey of _surveys">{{survey.title}}</option>
                        </select>
                    </div>

                    <my-date-picker [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event,'to')" *ngIf="fromDatePickerSet" class="pull-right"></my-date-picker>
                    <my-date-picker [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event,'from')" *ngIf="this._tabOptions[clickedTab]=='raw'" class="pull-right"></my-date-picker>
                </div>

                <div class="img-thumbnail" style="width:200%" *ngIf="clickedTab=='Branches'">

                    <a class="btn btn-primary pull-left" (click)="changeReportType('raw')">Raw Data</a>
                    <a class="btn btn-primary pull-left" (click)="changeReportType('chart')">Chart</a>

                    <div class="form-group pull-left" *ngIf="this._tabOptions[clickedTab]=='raw'">
                        <select class="form-control" [(ngModel)]="selectedBranchId" (change)="filter('branch')">
                            <option [value]="''">--Filter Branch--</option>
                            <option [value]="branch.id" *ngFor="let branch of _branches">{{branch.name}}</option>
                        </select>
                    </div>

                    <div class="form-group pull-left" *ngIf="this._tabOptions[clickedTab]=='raw'">
                        <select class="form-control" [(ngModel)]="selectedSurveyId" (change)="filter('survey')">
                            <option [value]="''">--Filter Survey--</option>
                            <option [value]="survey.id" *ngFor="let survey of _surveys">{{survey.title}}</option>
                        </select>
                    </div>

                    <div class="form-group pull-left" *ngIf="_tabOptions[clickedTab]=='chart'">
                        <select class="form-control" [(ngModel)]="_chartOptions['Branches']">
                            <option [value]="'pie'">Pie</option>
                            <option [value]="'bar'">Bar</option>
                        </select>
                    </div>

                    <my-date-picker [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event,'to')" *ngIf="fromDatePickerSet" class="pull-right"></my-date-picker>
                    <my-date-picker [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event,'from')" *ngIf="this._tabOptions[clickedTab]=='raw'" class="pull-right"></my-date-picker>
                </div>

                <div class="tab-content clearfix img-thumbnail" style="width:200%">

                    
                    <div class="tab-pane active" id="1a" *ngIf="clickedTab=='Overview' && _tabOptions[clickedTab]=='chart'">
                        <zingchart *ngFor="let chart of overviewpiecharts" [chart]="chart" [hidden]="_chartOptions[clickedTab]=='bar'"></zingchart>
                        <zingchart *ngFor="let chart of overviewbarcharts" [chart]="chart" [hidden]="_chartOptions[clickedTab]=='pie'"></zingchart>
                    </div>

                    <div class="tab-pane active" id="1a" *ngIf="clickedTab=='Overview' && _tabOptions[clickedTab]=='raw'">
                        <div class="content table-responsive table-full-width">

                            <pagination-controls (pageChange)="page = $event" id="1"
                                maxSize="5"
                                directionLinks="true"
                                autoHide="true"
                                class="pull-right"
                                style="pointer:cursor">
                            </pagination-controls>

                            <div class="pull-right">
                                <a (click)="export('pdf')" class="btn btn-default">Export To PDF</a>
                                <!--<a (click)="export('excel')" class="btn btn-default">Export To Excel</a>-->
                            </div>

                            <div class="form-group pull-right">
                                <select class="form-control" [(ngModel)]="_overviewItemsPerpage">
                                    <option [value]="10" [selected]="">--Items Per Page--</option>
                                    <option [value]="10">10</option>
                                    <option [value]="20">20</option>
                                    <option [value]="50">50</option>
                                    <option [value]="100">100</option>
                                </select>
                            </div>

                            <table class="table table-hover table-striped">
                                <thead>
                                    <th style="color:black">#</th>
                                    <th style="color:black">Questionaire</th>
                                    <th style="color:black">Branch</th>
                                    <th style="color:black">Question</th>
                                    <th style="color:black">Answer</th>
                                    <th style="color:black">Score</th>
                                    <th style="color:black">Icon</th>
                                    <th style="color:black">Date Created</th>
                                </thead>
                                <tbody>
                                    <tr *ngFor="let data of overViewtable | paginate: {itemsPerPage: _overviewItemsPerpage, currentPage:page, id: '1'};let i=index">
                                        <td style="color:black">{{i+1}}</td>
                                        <td style="color:black">{{data?.title}}</td>
                                        <td style="color:black">{{data?.name}}</td>
                                        <td style="color:black">{{data?.question}}</td>
                                        <td style="color:black">{{data?.responseName}}</td>
                                        <td style="color:black">{{data?.score}}</td>
                                        <td style="color:black">
                                            <img class="img-thumbnail" style="width:50px;height:50px" [src]="data?.src" alt="Image">
                                        </td>
                                        <td style="color:black">{{data?.created_at}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination-controls (pageChange)="page = $event" id="1"
                                maxSize="5"
                                directionLinks="true"
                                autoHide="true"
                                class="pull-right"
                                style="pointer:cursor">
                            </pagination-controls>
                        </div>
                    </div>

                    <div class="tab-pane active" id="3a" *ngIf="clickedTab=='Branches' && _tabOptions[clickedTab]=='chart'">
                        <zingchart *ngFor="let chart of branchesbarcharts" [chart]="chart" [hidden]="_chartOptions[clickedTab]=='pie'"></zingchart>
                        <zingchart *ngFor="let chart of branchespiecharts" [chart]="chart" [hidden]="_chartOptions[clickedTab]=='bar'"></zingchart>
                    </div>

                    <div class="tab-pane active" id="3a"  *ngIf="clickedTab=='Branches' && _tabOptions[clickedTab]=='raw'">
                        
                        <div class="content table-responsive table-full-width">
                
                            <pagination-controls (pageChange)="page = $event" id="3"
                                maxSize="5"
                                directionLinks="true"
                                autoHide="true"
                                class="pull-right"
                                style="pointer:cursor">
                            </pagination-controls>
                            <!--
                            <div class="pull-right">
                                <a (click)="export('pdf')" class="btn btn-default">Export To PDF</a>
                                <a (click)="export('excel')" class="btn btn-default">Export To Excel</a>
                            </div>
                            -->
                            <div class="form-group pull-right">
                                <select class="form-control" [(ngModel)]="_ratingsItemsPerPage">
                                    <option [value]="10" [selected]="">--Items Per Page--</option>
                                    <option [value]="10">10</option>
                                    <option [value]="20">20</option>
                                    <option [value]="30">50</option>
                                    <option [value]="40">100</option>
                                </select>
                            </div>

                            <table class="table table-hover table-striped">
                                <thead>
                                    <th style="color:black">#</th>
                                    <th style="color:black">Branch</th>
                                    <th style="color:black">Survey</th>
                                    <th style="color:black">Average Score</th>
                                    <th style="color:black">Icon</th>
                                </thead>
                                <tbody>
                                    <tr *ngFor="let branch of _branchesTable | paginate: {itemsPerPage: _ratingsItemsPerPage, currentPage:page, id: '3'};let i=index">
                                        <td style="color:black">{{i+1}}</td>
                                        <td style="color:black">{{branch?.branch}}</td>
                                        <td style="color:black">{{branch?.survey}}</td>
                                        <td style="color:black">{{branch?.averageScore}}</td>
                                        <td style="color:black">
                                            <img class="img-thumbnail" style="width:50px;height:50px" [src]="branch?.image" alt="Image">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination-controls (pageChange)="page = $event" id="3"
                                maxSize="5"
                                directionLinks="true"
                                autoHide="true"
                                class="pull-right"
                                style="pointer:cursor">
                            </pagination-controls>
                        </div>
                    </div>

                    <div class="tab-pane active" id="3a" *ngIf="clickedTab=='Ratings' && _tabOptions[clickedTab]=='chart'">
                        <zingchart *ngFor="let chart of ratingsbarcharts" [chart]="chart" ></zingchart>
                    </div>

                    <div class="tab-pane active" id="3a"  *ngIf="clickedTab=='Ratings' && _tabOptions[clickedTab]=='raw'">
                        
                        <div class="content table-responsive table-full-width">
                
                            <pagination-controls (pageChange)="page = $event" id="2"
                                maxSize="5"
                                directionLinks="true"
                                autoHide="true"
                                class="pull-right"
                                style="pointer:cursor">
                            </pagination-controls>

                            <div class="pull-right">
                                <a (click)="export('pdf')" class="btn btn-default">Export To PDF</a>
                                <!--<a (click)="export('excel')" class="btn btn-default">Export To Excel</a>-->
                            </div>

                            <div class="form-group pull-right">
                                <select class="form-control" [(ngModel)]="_ratingsItemsPerPage">
                                    <option [value]="10" [selected]="">--Items Per Page--</option>
                                    <option [value]="10">10</option>
                                    <option [value]="20">20</option>
                                    <option [value]="30">50</option>
                                    <option [value]="40">100</option>
                                </select>
                            </div>

                            <table class="table table-hover table-striped">
                                <thead>
                                    <th style="color:black">#</th>
                                    <th style="color:black">Survey</th>
                                    <th style="color:black">Branch</th>
                                    <th style="color:black">Rater</th>
                                    <th style="color:black">Rater Score</th>
                                    <th style="color:black">Total Votes</th>
                                    <th style="color:black">Average Score</th>
                                    <th style="color:black">Response Rate (%)</th>
                                    <th style="color:black">Response Rate (d)</th>
                                </thead>
                                <tbody>
                                    <tr *ngFor="let rating of _ratingsTable | paginate: {itemsPerPage: _ratingsItemsPerPage, currentPage:page, id: '2'};let i=index">
                                        <td style="color:black">{{i+1}}</td>
                                        <td style="color:black">{{rating?.survey}}</td>
                                        <td style="color:black">{{rating?.branch}}</td>
                                        <td style="color:black">{{rating?.responseName}}</td>
                                        <td style="color:black">{{rating?.score}}</td>
                                        <td style="color:black">{{rating?.numberOfResponses}}</td>
                                        <td style="color:black">{{rating?.averageScore}}</td>
                                        <td style="color:black">{{rating?.percentageScore}}</td>
                                        <td style="color:black">{{rating?.decimalScore}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <pagination-controls (pageChange)="page = $event" id="2"
                                maxSize="5"
                                directionLinks="true"
                                autoHide="true"
                                class="pull-right"
                                style="pointer:cursor">
                            </pagination-controls>
                        </div>
                    </div>

                    <!--
                    <div class="tab-pane" id="2a" *ngIf="clickedTab=='Surveys'">
                        <div class="pull-right">
                            <a (click)="export('pdf')" class="btn btn-default">Export To PDF</a>
                            <a (click)="export('excel')" class="btn btn-default">Export To Excel</a>
                        </div>
                        <zingchart *ngFor="let chart of charts" [chart]="chart" ></zingchart>
                        <zingchart *ngFor="let chart of stackedbarcharts" [chart]="chart" ></zingchart>
                    </div>
                    -->

                </div>

            </div>

        </my-content>
       `  
   })
   export class ReportComponent implements OnInit, OnDestroy {
        
     charts: any; //Chart[];

     branchesbarcharts: any;

     branchespiecharts: any;

     lineChart;

     overviewpiecharts: Array<any>=[];

     overviewbarcharts: Array<any>=[];

     stackedbarcharts: any;

     multistackedbarchart;

     private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    }

     myDatePickerOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px',
        inline: false,
        disableUntil: {year: 2016, month: 8, day: 10},
        selectionTxtFontSize: '16px'
    };

     selectedBranchId;

     selectedSurveyId;

     private clickedTab = 'Overview';

     private _tabOptions ={
                            'Overview':'raw',
                            'Surveys':'raw',
                            'Ratings':'raw',
                            'Branches':'raw'
                        };
                        
    private _chartOptions ={
                            'Overview':'pie',
                            'Surveys':'pie',
                            'Ratings':'pie',
                            'Branches':'pie'
                        };

     private fromDatePickerSet; 

     private dateFilter: Array<any> = [];

     public overViewtable: Array<any> = [];

     public ratingsbarcharts: Array<any> = [];

     private _ratingsTable: Array<any> = [];

     private _branchesTable: Array<any> = [];

     public data;

     private _branches;

     private _surveys;

     private _overviewItemsPerpage: number = 10;

     private _ratingsItemsPerPage: number = 10;

     //@Input('taxonomySeparator') taxonomy_seperator: string;

     constructor (
                    private _reportService: ReportService, 
                    private _notification: NotificationsService,
                    private _fileService: FileService,
                    private _branchService: BranchService,
                    private _surveyService: SurveyService) {
      }

      ngOnInit(){
          
        this._branchService.getBranches().subscribe(
            result => this._branches = result.branches,
            error => this._notification.error('Error', error)
        );
        
        this._surveyService.getSurveys().subscribe(
                result => this._surveys = result.surveys,
                error => console.log(error)
        );

        //Fetch Overview Report
        var obj = {};
        obj['branchId'] = '';
        obj['surveyId'] = '';
        obj['from'] = '';
        obj['tab'] = this.clickedTab;
        obj['to'] = '';
        this.dateFilter.push(obj);
        this.getReport(this.dateFilter);
        this.dateFilter=[];
      }

      ngOnDestroy(){}


      filter(option){
          //if(option=='branch'){
                var obj = {};
                obj['branchId'] = this.selectedBranchId || '';
                obj['surveyId'] = this.selectedSurveyId || '';
                obj['tab'] = this.clickedTab;
                obj['to'] = '';
                obj['from'] = '';
                this.dateFilter.push(obj);
                this.getReport(this.dateFilter);
                this.dateFilter = [];
        //   }else if(option=='survey'){
        //         var obj = {};
        //         obj['surveyId'] = this.selectedSurveyId;
        //         obj['branchId'] = '';
        //         obj['tab'] = this.clickedTab;
        //         obj['to'] = '';
        //         obj['from'] = '';
        //         this.dateFilter.push(obj);
        //         this.getReport(this.dateFilter);
        //         this.dateFilter = [];
        //   }
      }

      getReport(filter){
        
        this._reportService.getReport(filter).subscribe(
            result => {
                switch (this.clickedTab) {
                    case 'Overview':
                        this.overviewpiecharts = result.report.pie;
                        this.overviewbarcharts = result.report.bar;
                        this.overViewtable = result.raw;
                        break;
                    case 'Branches':
                        this.branchespiecharts = result.report.pie;
                        this.branchesbarcharts = result.report.bar;
                        //this.barcharts = result.report;
                        this._branchesTable = result.raw;
                        break;
                    case 'Ratings':
                        this._ratingsTable = result.raw;
                        this.ratingsbarcharts = result.report;
                        break;
                    default:
                        break;
                }
                this._notification.success('Success', 'Reports updated...')
            },
            error => this._notification.error('Error', error)
        );

      }

      onDateChanged(event:any, option) {
        if(new Date(event.jsdate).toLocaleDateString() == "1/1/1970") {
            this.fromDatePickerSet = '';
            return;
        }
        if(option=='from') {
            this.fromDatePickerSet = new Date(event.jsdate).toLocaleDateString();
        }else if(option=='to') { 
            var obj = {};
            obj['branchId'] = '';
            obj['surveyId'] = '';
            obj['from'] = this.fromDatePickerSet;
            obj['tab'] = this.clickedTab;
            obj['to'] = new Date(event.jsdate).toLocaleDateString();
            this.dateFilter.push(obj);
            //FETCH REPORT
            this.getReport(this.dateFilter);
            this.fromDatePickerSet='';
            this.dateFilter=[];
        }
        //console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
      }

      export(fileType){

        this._notification.info('Info', `Generating ${fileType} report. This may take long depending on the size of data`);
        this._fileService.generate(this.clickedTab, fileType)
                    .subscribe(
                        success => window.open(this._fileService.printReport(success.file, fileType)),
                        error => this._notification.error('Error', `Error generating ${fileType} report`)
                    );
    }

    updateReport(){
        var obj = {};
        obj['branchId'] = '';
        obj['surveyId'] = '';
        obj['from'] = '';//new Date().toLocaleDateString();
        obj['tab'] = this.clickedTab;
        obj['to'] = '';//new Date().toLocaleDateString();
        this.dateFilter.push(obj);
        this.getReport(this.dateFilter);
        this.fromDatePickerSet='';
        this.dateFilter=[];
    }

    changeReportType(type){
        this._tabOptions[this.clickedTab] = type;
    }
       
   }