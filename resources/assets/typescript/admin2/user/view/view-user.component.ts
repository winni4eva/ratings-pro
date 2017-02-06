import { Component, OnInit, OnDestroy  } from '@angular/core';
import { UserService } from '../user.service';
import { NotificationsService } from 'angular2-notifications';

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
                        <th>Number Of branches Attached</th>
                    </thead>
                    <tbody>
                        <tr *ngFor="let user of _users; let i = index">
                            <td>{{user?.first_name}}</td>
                            <td>{{user?.last_name}}</td>
                            <td>{{user?.email}}</td>
                            <td>{{user?.company}}</td>
                            <td>{{user?.branch_user?.length}}</td>
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


    constructor(
                private _userService: UserService,
                private _notification: NotificationsService){}

    ngOnInit(){
        this._userService.getUsers().subscribe(
            result => this._users = result.resource,
            error => console.log(error)
        );
    }

    ngOnDestroy(){
        //
    }
 }
