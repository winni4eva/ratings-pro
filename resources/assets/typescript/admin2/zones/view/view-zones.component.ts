import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ZoneService } from '../zones.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
    selector: 'my-view-survey',
    template:
   `
        <simple-notifications [options]="_options"></simple-notifications>

        <my-content title="Zones">

            <div class="content table-responsive table-full-width">
                <table class="table table-hover table-striped">
                    <thead>
                        <th>Zone</th>
                        <th>Number Of Branches</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        <tr *ngFor="let zone of _zones; let i = index">
                            <td>{{zone?.name}}</td>
                            <td>{{zone?.zone_branches?.length}}</td>
                            <td><a class="btn btn-default" style="pointer:cursor" (click)="addBranches(zone?.id)">branches</a></td>
                            <td></td>
                            <td>
                                <select class="form-control" [(ngModel)]="_actionValue[i]" (change)="action(i, zone?.id)">
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

export class ViewZonesComponent implements OnInit, OnDestroy {

    private _zones: Array<any> = [];

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    }

    private _actionValue: Array<String>=[];


    constructor(
                private _zoneService: ZoneService,
                private _notification: NotificationsService,
                private _router: Router){}

    ngOnInit(){
        this._zoneService.getZones().subscribe(
            result => this._zones = result.zones,
            error => console.log(error)
        );
    }

    ngOnDestroy(){
        //
    }

    action(index, zoneId) {
        if(!this._actionValue[index]) return;

        if(this._actionValue[index] == 'edit') {
            let confirmed = confirm("Are you sure you want to edit the selected zone");
            //if (confirmed) 
                //this._router.navigate([`admin/add_user/${userId}`]);
    
        }else if(this._actionValue[index] == 'delete'){
            let confirmed = confirm("Are you sure you want to remove the selected zone");
            //if (confirmed) 
                //this.remove( zoneId );
        }
    
    }

    addBranches(zoneId){
        this._router.navigate([ `/admin/zone-branches/${zoneId}` ]);
    }

    remove(userId){
        // this._miscService.removeResponse(responseId)
        //         .subscribe( 
        //                         result => 
        //                             this._notification.success('Success', 'Response removed successfully...')
        //                             //this._responses = result.responses
        //                         ,
        //                         error => this._notification.error('Error', error),
        //                         () => this.getResponses()
        //                     );
    }
 }
