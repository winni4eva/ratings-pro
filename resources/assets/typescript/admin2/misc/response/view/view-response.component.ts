import { Component, OnInit, OnDestroy  } from '@angular/core';
import { MiscService } from '../../misc.service';
import {NotificationsService} from 'angular2-notifications';
//import{ Pagination, PaginatedResult } from '../../../../shared/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
    selector: 'my-view-response',
    template:
   `
        <simple-notifications [options]="_options"></simple-notifications>

        <my-content title="Responses">
            <div class="content table-responsive table-full-width">
                <table class="table table-hover table-striped">
                    <thead>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Image</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        <tr *ngFor="let response of _responses; let i = index">
                            <td>{{response?.name}}</td>
                            <td>{{response?.rater?.score}}</td>
                            <td><img [src]="response?.rater?.image?.src" style="width:50px;height:50px"/></td>
                            <td>
                                <select class="form-control" [(ngModel)]="_actionValue[i]" (change)="action(i, response?.id)">
                                    <option value="">--Select Action--</option>
                                    <option [value]="'edit'">Edit</option>
                                    <option [value]="'delete'">Delete</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </my-content>
    `
})

export class ViewResponseComponent implements OnInit, OnDestroy {

    private _responses;

    private _actionValue: Array<String>=[];

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    }

    public itemsPerPage: number = 2;

    public totalItems: number = 0;

    public currentPage: number = 1;

    constructor(
                private _miscService: MiscService,
                private _notification: NotificationsService,
                private _router: Router){}

    ngOnInit(){
        this.getResponses();
    }

    getResponses(){

        this._miscService.getResponses().subscribe(
            result => {
                this._responses = result.responses;
                //this.totalItems = result.responses.total;
            },
            error => this._notification.error('Error', error)
        );

    }

    action(index, responseId) {
        if(!this._actionValue[index]) return;

        if(this._actionValue[index] == 'edit') {
            let confirmed = confirm("Are you sure you want to edit the selected response");
            if (confirmed) 
                this._router.navigate([`admin/add_response/${responseId}`]);
    
        }else if(this._actionValue[index] == 'delete'){
            let confirmed = confirm("Are you sure you want to remove the selected response");
            if (confirmed) 
                this.remove( responseId );
        }
    
    }

    remove(responseId){
        this._miscService.removeResponse(responseId)
                .subscribe( 
                                result => 
                                    this._notification.success('Success', 'Response removed successfully...')
                                    //this._responses = result.responses
                                ,
                                error => this._notification.error('Error', error),
                                () => this.getResponses()
                            );
    }

    ngOnDestroy(){
        //
    }
 }
