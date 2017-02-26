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
                        <a href="#3a" data-toggle="tab" (click)="clickedTab='Ratings';updateReport()">Ratings</a>
                    </li>

                    <li>
                        <a href="#4a" data-toggle="tab" (click)="clickedTab='Branches';updateReport()">Branches</a>
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

                <div class="tab-content clearfix img-thumbnail" style="width:200%">

                    <div class="tab-pane active" id="1a" *ngIf="clickedTab=='Overview' && _tabOptions[clickedTab]=='chart'">
                        <zingchart *ngFor="let chart of piecharts" [chart]="chart" ></zingchart>
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
                                <a (click)="export('excel')" class="btn btn-default">Export To Excel</a>
                            </div>

                            <div class="form-group pull-right">
                                <select class="form-control" [(ngModel)]="_overviewItemsPerpage" (change)="setItemsPerPage()">
                                    <option [value]="10" [selected]="">--Items Per Page--</option>
                                    <option [value]="10">10</option>
                                    <option [value]="10">20</option>
                                    <option [value]="10">50</option>
                                    <option [value]="10">100</option>
                                </select>
                            </div>

                            <table class="table table-hover table-striped">
                                <thead>
                                    <th style="color:black">#</th>
                                    <th style="color:black">Questionaire</th>
                                    <th style="color:black">Branch</th>
                                    <th style="color:black">Previous Answer</th>
                                    <th style="color:black">Answer</th>
                                    <th style="color:black">Score</th>
                                    <th style="color:black">Icon</th>
                                    <th style="color:black">Date Created</th>
                                </thead>
                                <tbody>
                                    <tr *ngFor="let data of overViewtable | paginate: {itemsPerPage: _overviewItemsPerpage, currentPage:page, id: '1'};let i=index">
                                        <td style="color:black">{{i+1}}</td>
                                        <td style="color:black">{{data?.survey?.title}}</td>
                                        <td style="color:black">{{data?.branch?.name}}</td>
                                        <td style="color:black">{{data?.previous_response?.name}}</td>
                                        <td style="color:black">{{data?.response?.name}}</td>
                                        <td style="color:black">{{data?.response?.rater?.score}}</td>
                                        <td style="color:black">
                                            <img class="img-thumbnail" style="width:50px;height:50px" [src]="data?.response?.rater?.image?.src" alt="Image">
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

                    <div class="tab-pane" id="4a" *ngIf="clickedTab=='Branches'">
                        <zingchart *ngFor="let chart of barcharts" [chart]="chart" ></zingchart>
                    </div>

                    <div class="tab-pane active" id="3a" *ngIf="clickedTab=='Ratings' && _tabOptions[clickedTab]=='chart'">
                        <zingchart *ngFor="let chart of multistackedbarchart" [chart]="chart" ></zingchart>
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
                                <a (click)="export('excel')" class="btn btn-default">Export To Excel</a>
                            </div>

                            <div class="form-group pull-right">
                                <select class="form-control" [(ngModel)]="_ratingsItemsPerPage" (change)="setItemsPerPage()">
                                    <option [value]="10" [selected]="">--Items Per Page--</option>
                                    <option [value]="10">10</option>
                                    <option [value]="10">20</option>
                                    <option [value]="10">50</option>
                                    <option [value]="10">100</option>
                                </select>
                            </div>

                            <table class="table table-hover table-striped">
                                <thead>
                                    <th style="color:black">#</th>
                                    <th style="color:black">Survey</th>
                                    <th style="color:black">Rater</th>
                                    <th style="color:black">Score</th>
                                    <th style="color:black">Count</th>
                                    <th style="color:black">Average</th>
                                </thead>
                                <tbody>
                                    <tr *ngFor="let rating of _ratingsTable | paginate: {itemsPerPage: _ratingsItemsPerPage, currentPage:page, id: '2'};let i=index">
                                        <td style="color:black">{{i+1}}</td>
                                        <td style="color:black">{{rating?.title}}</td>
                                        <td style="color:black">{{rating?.name}}</td>
                                        <td style="color:black">{{rating?.score}}</td>
                                        <td style="color:black">{{rating?.count}}</td>
                                        <td style="color:black">{{rating?.average}}</td>
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

     barcharts: any;

     lineChart;

     piecharts: any;

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

     private fromDatePickerSet; 

     private dateFilter: Array<any> = [];

     public overViewtable: Array<any> = [];

     private _ratingsTable: Array<any> = [];

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

        // this.charts = [
        //   {
        //     id: 'chart-1',
        //     data: {
        //       title: {
        //         "text": "Surveys & Responses",
        //         "font-size": "24px",
        //         "adjust-layout":true
        //       },
        //       plotarea: {
        //         "margin": "dynamic 45 60 dynamic",
        //       },
        //       legend: {
        //         "layout": "float",
        //         "background-color": "none",
        //         "border-width": 0,
        //         "shadow": 0,
        //         "align":"center",
        //         "adjust-layout":true,
        //         "item":{
        //         "padding": 7,
        //         "marginRight": 17,
        //         "cursor":"hand"
        //         }
        //       },
        //       "type": "line", 
        //       "series": [ 
        //         {"values":[20,40,25,50,15,45,33,34]}, 
        //         {"values":[5,30,21,18,59,50,28,33]}, 
        //         {"values":[30,5,18,21,33,41,29,15]} 
        //       ] 
        //     },
        //     height: 600,
        //     width: '100%',
        //     "scale-x":{
        //       "values":"0:35:7",
        //       "format":"Day %v"
        //     },
        //     "scale-y":{
        //       "values":"0:100:20",
        //       "format":"%v%",
        //       "guide":{
        //         "line-style":"dashdot"
        //       }
        //     }
        //   }
        // ];

        // this.stackedbarcharts = [
        //   {
        //     id: 'chart-4',
        //     data: {
        //       "type": "bar3d",
        //       "plot":{
        //         "stacked":true,
        //         "stack-type":"normal" /* Optional specification */
        //       }, 
        //       "series": [ 
        //         {"values":[20,40,25,50,15,45,33,34]}, 
        //         {"values":[5,30,21,18,59,50,28,33]}, 
        //         {"values":[30,5,18,21,33,41,29,15]} 
        //       ]
        //     },
        //     height: 600,
        //     width: '100%'
        //     }
        // ];

        this.multistackedbarchart = [
          {
            id: 'chart-6',
            data: {
              "type": "bar3d",
              "plot":{
                "aspect":"bar"
              },
              "series": [
                    {
                        "text": "Qaulity Service Survey", 
                        "values":[20,40,25,50,15,45,33,34,32]
                    },
                    {
                        "text": "Money Transfer Survey", 
                        "values":[5,30,21,18,59,50,28,33,12]
                    },
                    {
                        "text": "Saturday Banking Survey", 
                        "values":[30,5,18,21,33,41,29,15,32]
                    }
                ]
            },
            height: 600,
            width: '100%'
            }
        ];

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

      setItemsPerPage() {
        this.updateReport();
     }

      filter(option){
          if(option=='branch'){
                var obj = {};
                obj['branchId'] = this.selectedBranchId;
                obj['surveyId'] = '';
                obj['tab'] = this.clickedTab;
                obj['to'] = '';
                obj['from'] = '';
                this.dateFilter.push(obj);
                this.getReport(this.dateFilter);
                this.dateFilter = [];
          }else if(option=='survey'){
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
      }

      //public toInt(num: string) {
            //return +num;
      //}

      //public sortByWordLength = (a: any) => {
            //return a.city.length;
      //}

      getReport(filter){
        
        this._reportService.getReport(filter).subscribe(
            result => {
                switch (this.clickedTab) {
                    case 'Overview':
                        this.piecharts = result.report;
                        this.overViewtable = result.raw;
                        break;
                    case 'Branches':
                        this.barcharts = result.report;
                        break;
                    case 'Ratings':
                        this._ratingsTable = result.raw;
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