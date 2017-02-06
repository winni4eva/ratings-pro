import { Component, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../shared/storage/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidator } from '../../../shared/validator/custom-validator.service';
import { UserService } from '../user.service';
import { AddUserInterface } from './add-user.model';
import { BranchService } from '../../branch/branch.service';

@Component({
    selector: 'my-add-user',
    template:
   `
   <simple-notifications [options]="_options"></simple-notifications>

   <my-content [title]="'Add User'">
        <div class="content">
            <form autocomplete="off" [formGroup]="form" (ngSubmit)="add(form.value, form.valid)" novalidate>

                <div class="row">

                    <div class="col-md-6">

                        <div class="form-group">
                            <label>First Name</label>
                            <input type="text" formControlName="first_name" class="form-control" placeholder="First name">
                            <small [hidden]="form.controls.first_name.pristine || !form.controls.first_name.hasError('required')" class="inputError">First name is required.</small>
                        </div>

                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" formControlName="email" class="form-control" placeholder="Email">
                            <small [hidden]="form.controls.email.pristine || !form.controls.email.hasError('required')" class="inputError">Email is required.</small>
                            <small [hidden]="!form.controls.email.hasError('incorrectMailFormat')" class="inputError">Email format should be <i>example@example.com</i>.</small>
                        </div>

                        <div class="form-group">
                            <label>Branch</label>
                            <select formControlName="branch_id" class="form-control">
                                <option [value]="''">--Select Branch--</option>
                                <option [value]="branch.id" *ngFor="let branch of _branches">{{branch.name}}</option>
                            </select>
                            <small [hidden]="form.controls.branch_id.pristine || !form.controls.branch_id.hasError('required')" class="inputError">Branch name is required.</small>
                        </div>

                        <div class="form-group">
                            <label>Company</label>
                            <input type="text" formControlName="company" class="form-control" placeholder="Last name">
                            <small [hidden]="form.controls.company.pristine || !form.controls.company.hasError('required')" class="inputError">Last name is required.</small>
                        </div>
                        
                    </div>

                    <div class="col-md-6">

                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" formControlName="last_name" class="form-control" placeholder="Last name">
                            <small [hidden]="form.controls.last_name.pristine || !form.controls.last_name.hasError('required')" class="inputError">Last name is required.</small>
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" formControlName="password" class="form-control" placeholder="Password">
                            <small [hidden]="form.controls.password.pristine || !form.controls.password.hasError('required')" class="inputError">Password is required.</small>
                        </div>

                        <div class="form-group">
                            <label>Admin</label>
                            <select formControlName="admin" class="form-control">
                                <option [value]="0">No</option>
                                <option [value]="1">Yes</option>
                            </select>
                            <small [hidden]="form.controls.admin.pristine || !form.controls.admin.hasError('required')" class="inputError">User's admin status is required.</small>
                        </div>
                        
                    </div>

                </div>


                <button type="submit" class="btn btn-info btn-fill pull-left" [disabled]="!form.valid">Add User</button>
                <div class="clearfix"></div>
            </form>
        </div>
    </my-content>
    `
})

export class AddUserComponent implements OnInit {

    private form;

    private _branches;

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    }

    constructor(
              private _storageService: StorageService,
              private _router: Router,
              private _notification: NotificationsService,
              private _fb: FormBuilder,
              private _userService: UserService,
              private _branchService: BranchService){}

    ngOnInit(){
        this._branchService.getBranches().subscribe(
            result => this._branches = result.branches,
            error => this._notification.error('Error', error)
        )
        this.form = this._fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, CustomValidator.mailFormat])],
            password: ['', Validators.required],
            company: ['', Validators.required],
            branch_id: ['', Validators.required],
            admin: ['', Validators.required]
        });
    }

    add(model: AddUserInterface, isValid: boolean){
        //if(!isValid) return;
        console.log(model);
        this._userService.addUser(model).subscribe(
            result => this._notification.success('Success', result.success),
            error => this._notification.error('Error', error)
        );
    }

 }
