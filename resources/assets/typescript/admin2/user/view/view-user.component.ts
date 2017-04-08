import { Component, OnInit, OnDestroy  } from '@angular/core';
import { UserService } from '../user.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
    selector: 'my-view-survey',
    template:
   `
        <simple-notifications [options]="_options"></simple-notifications>

        <my-content title="Users">

            <div class="content table-responsive table-full-width">
                <table class="table table-hover table-striped">
                    <thead>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <!--<th>Number Of branches Attached</th>-->
                        <th>Role</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        <tr *ngFor="let user of _users; let i = index">
                            <td>{{user?.first_name}}</td>
                            <td>{{user?.last_name}}</td>
                            <td>{{user?.email}}</td>
                            <td>{{user?.company}}</td>
                            <!--<td>{{user?.branch_user?.length}}</td>-->
                            <td>{{user?.role}}</td>
                            <td>
                                <select class="form-control" [(ngModel)]="_actionValue[i]" (change)="action(i, user?.id)">
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

export class ViewUserComponent implements OnInit, OnDestroy {

    private _users;

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    }

    private _actionValue: Array<String>=[];


    constructor(
                private _userService: UserService,
                private _notification: NotificationsService,
                private _router: Router){}

    ngOnInit(){
        this._userService.getUsers().subscribe(
            result => this._users = result.resource,
            error => console.log(error)
        );
    }

    ngOnDestroy(){
        //
    }

    action(index, userId) {
        if(!this._actionValue[index]) return;

        if(this._actionValue[index] == 'edit') {
            let confirmed = confirm("Are you sure you want to edit the selected user");
            if (confirmed) 
                this._router.navigate([`admin/add_user/${userId}`]);
    
        }else if(this._actionValue[index] == 'delete'){
            let confirmed = confirm("Are you sure you want to remove the selected user");
            if (confirmed) 
                this.remove( userId );
        }
    
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
