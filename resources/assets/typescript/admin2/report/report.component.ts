import {Component, OnInit, OnDestroy} from '@angular/core';
import { ZingChart } from '../chart/zingchart.component';
import { Chart } from '../chart/chart.model';
import { ReportService } from './report.service';
import { NotificationsService } from 'angular2-notifications';
import { FileService } from '../../shared/file-generator/file.service';

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
                    <!--
                    <li>
                        <a href="#2a" data-toggle="tab" (click)="clickedTab='Surveys';updateReport()">Surveys</a>
                    </li>
                    <li>
                        <a href="#3a" data-toggle="tab" (click)="clickedTab='Ratings';updateReport()">Ratings</a>
                    </li>
                    -->
                    <li>
                        <a href="#4a" data-toggle="tab" (click)="clickedTab='Branches';updateReport()">Branches</a>
                    </li>
                </ul>

                <div class="img-thumbnail" style="width:200%" *ngIf="clickedTab=='Overview'">
                    <a class="btn btn-primary pull-left" (click)="changeReportType('raw')">Raw Data</a>
                    <a class="btn btn-primary pull-left" (click)="changeReportType('chart')">Chart</a>

                    <my-date-picker [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event,'to')" *ngIf="fromDatePickerSet" class="pull-right"></my-date-picker>
                    <my-date-picker [options]="myDatePickerOptions" (dateChanged)="onDateChanged($event,'from')" class="pull-right"></my-date-picker>
                </div>

                <div class="tab-content clearfix img-thumbnail" style="width:200%">

                    <div class="pull-right" *ngIf="clickedTab=='Overview' && _tabOptions[clickedTab]=='raw'">
                        <a (click)="export('pdf')" class="btn btn-default">Export To PDF</a>
                        <a (click)="export('excel')" class="btn btn-default">Export To Excel</a>
                    </div>

                    <div class="tab-pane active" id="1a" *ngIf="clickedTab=='Overview' && _tabOptions[clickedTab]=='chart'">
                        <zingchart *ngFor="let chart of piecharts" [chart]="chart" ></zingchart>
                    </div>

                    <div class="tab-pane active" id="1a" *ngIf="clickedTab=='Overview' && _tabOptions[clickedTab]=='raw'">
                        <div class="content table-responsive table-full-width">

                            <table class="table table-hover table-striped">
                                <thead>
                                    <th style="color:black">Questionaire</th>
                                    <th style="color:black">Branch</th>
                                    <th style="color:black">Previous Answer</th>
                                    <th style="color:black">Answer</th>
                                    <th style="color:black">Score</th>
                                    <th style="color:black">Icon</th>
                                    <th style="color:black">Date Created</th>
                                </thead>
                                <tbody>
                                    <tr *ngFor="let data of overViewtable">
                                        <td style="color:black">{{data?.survey?.title}}</td>
                                        <td style="color:black">{{data?.branch?.name}}</td>
                                        <td style="color:black">{{data?.previous_response?.name}}</td>
                                        <td style="color:black">{{data?.response?.name}}</td>
                                        <td style="color:black">{{data?.response?.rater?.score}}</td>
                                        <td style="color:black">
                                            <img class="img-thumbnail" [src]="data?.response?.rater?.image?.src" alt="Image">
                                        </td>
                                        <td style="color:black">{{data?.created_at}}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                    <!--
                    <div class="tab-pane" id="2a" *ngIf="clickedTab=='Surveys'">
                        <div class="pull-right">
                            <a (click)="export('pdf')" class="btn btn-default">Export To PDF</a>
                            <a (click)="export('excel')" class="btn btn-default">Export To Excel</a>
                        </div>
                        <zingchart *ngFor="let chart of charts" [chart]="chart" ></zingchart>
                    </div>
                    -->
                    <!--
                    <div class="tab-pane" id="3a" *ngIf="clickedTab=='Ratings'">
                        <zingchart *ngFor="let chart of stackedbarcharts" [chart]="chart" ></zingchart>
                    </div>
                    -->
                    <div class="tab-pane" id="4a" *ngIf="clickedTab=='Branches'">
                        <zingchart *ngFor="let chart of barcharts" [chart]="chart" ></zingchart>
                    </div>

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

     private clickedTab = 'Overview';

     private _tabOptions ={
                            'Overview':'raw',
                            'Surveys':'raw',
                            'Ratings':'raw',
                            'Branches':'raw'
                            };

     private fromDatePickerSet; 

     private dateFilter: Array<any> = [];

     overViewtable;

     public data;
     
     public filterQuery = "";
     
     public rowsOnPage = 10;
     
     public sortBy = "email";
     
     public sortOrder = "asc";

     constructor (
                    private _reportService: ReportService, 
                    private _notification: NotificationsService,
                    private _fileService: FileService) {

        this.charts = [
          {
            id: 'chart-1',
            data: {
              title: {
                "text": "Surveys & Responses",
                "font-size": "24px",
                "adjust-layout":true
              },
              plotarea: {
                "margin": "dynamic 45 60 dynamic",
              },
              legend: {
                "layout": "float",
                "background-color": "none",
                "border-width": 0,
                "shadow": 0,
                "align":"center",
                "adjust-layout":true,
                "item":{
                "padding": 7,
                "marginRight": 17,
                "cursor":"hand"
                }
              },
              "type": "line", 
              "series": [ 
                {"values":[20,40,25,50,15,45,33,34]}, 
                {"values":[5,30,21,18,59,50,28,33]}, 
                {"values":[30,5,18,21,33,41,29,15]} 
              ] 
            },
            height: 600,
            width: '100%',
            "scale-x":{
              "values":"0:35:7",
              "format":"Day %v"
            },
            "scale-y":{
              "values":"0:100:20",
              "format":"%v%",
              "guide":{
                "line-style":"dashdot"
              }
            }
          }
        ];

        this.stackedbarcharts = [
          {
            id: 'chart-4',
            data: {
              "type": "bar3d",
              "plot":{
                "stacked":true,
                "stack-type":"normal" /* Optional specification */
              }, 
              "series": [ 
                {"values":[20,40,25,50,15,45,33,34]}, 
                {"values":[5,30,21,18,59,50,28,33]}, 
                {"values":[30,5,18,21,33,41,29,15]} 
              ]
            },
            height: 600,
            width: '100%'
            }
        ];

      }

      ngOnInit(){
            //Fetch Overview Report
            var obj = {};
            obj['from'] = '';
            obj['tab'] = this.clickedTab;
            obj['to'] = '';
            this.dateFilter.push(obj);
            this.getReport(this.dateFilter);
            this.dateFilter=[];
      }

      ngOnDestroy(){}

      public toInt(num: string) {
            return +num;
      }

      public sortByWordLength = (a: any) => {
            return a.city.length;
      }

      getReport(filter){
        
        this._reportService.getReport(filter).subscribe(
            result => {
                if(this.clickedTab=='Overview') {
                    this.piecharts= result.report;
                    this.overViewtable = result.raw;
                }else if(this.clickedTab=='Branches'){
                    this.barcharts = result.report;
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
        this._fileService.generate('surveys', fileType)
                    .subscribe(
                        success => window.open(this._fileService.printReport(success.file, fileType)),
                        error => this._notification.error('Error', `Error generating ${fileType} report`)
                    );
    }

    updateReport(){
        var obj = {};
        obj['from'] = new Date().toLocaleDateString();
        obj['tab'] = this.clickedTab;
        obj['to'] = new Date().toLocaleDateString();
        this.dateFilter.push(obj);
        this.getReport(this.dateFilter);
        this.fromDatePickerSet='';
        this.dateFilter=[];
    }

    changeReportType(type){
        this._tabOptions[this.clickedTab] = type;
    }
       
   }