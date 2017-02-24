import { Component, OnInit, OnDestroy  } from '@angular/core';
import { SurveyService } from '../survey.service';
import { FileService } from '../../../shared/file-generator/file.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'my-view-survey',
    template:
   `
        <simple-notifications [options]="_options"></simple-notifications>

        <my-content title="Surveys">

            <div class="content table-responsive table-full-width">
                <table class="table table-hover table-striped">
                    <thead>
                        <th>Survey</th>
                        <th>Category</th>
                    </thead>
                    <tbody>
                        <tr *ngFor="let survey of _surveys; let i = index">
                            <td>{{survey?.title}}</td>
                            <td>{{survey?.category?.name}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </my-content>
    `
})

export class ViewSurveyComponent implements OnInit, OnDestroy {

    private _surveys;

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    }


    constructor(
                private _surveyService: SurveyService,
                private _fileService: FileService,
                private _notification: NotificationsService){}

    ngOnInit(){
        this._surveyService.getSurveys().subscribe(
            result => this._surveys = result.surveys,
            error => console.log(error)
        );
    }

    export(fileType){
        this._notification.info('Info', 'Generating survey report. This may take long depending on the size of data');
        this._fileService.generate('surveys', fileType)
                    .subscribe(
                        success => window.open(this._fileService.printReport(success.file, fileType)),
                        error => this._notification.error('Error', 'Error generating survey report')
                    );
    }

    ngOnDestroy(){
        //
    }
 }
