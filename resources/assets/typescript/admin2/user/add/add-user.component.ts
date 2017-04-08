import { Component, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../shared/storage/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidator } from '../../../shared/validator/custom-validator.service';
import { UserService } from '../user.service';
import { AddUserInterface } from './add-user.model';
import { BranchService } from '../../branch/branch.service';
import { ZoneService } from '../../zones/zones.service';
import { ConditionalValidator } from '../../../shared/validator/conditional-required.service';

@Component({
    selector: 'my-add-user',
    template:
   `
   <simple-notifications [options]="_options"></simple-notifications>

   <my-content [title]="(_userId>0)? 'Edit User' : 'Add User'">
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
                            <label>Role</label>
                            <select formControlName="role" class="form-control">
                                <option value="branch">Branch Manager</option>
                                <option value="zonal">Zonal/Regional Manager</option>
                                <option value="admin">Administrator</option>
                            </select>
                            <small [hidden]="form.controls.role.pristine || !form.controls.role.hasError('required')" class="inputError">User's role is required.</small>
                        </div>

                        <div class="form-group">
                            <label>Company</label>
                            <input type="text" formControlName="company" class="form-control" placeholder="Last name">
                            <small [hidden]="form.controls.company.pristine || !form.controls.company.hasError('required')" class="inputError">Company is required.</small>
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

                        <div class="form-group" *ngIf="form.get('role').value=='zonal'">
                            <label>Zone</label>
                            <select formControlName="zone_id" class="form-control">
                                <option [value]="''">--Select Zone--</option>
                                <option [value]="zone.id" *ngFor="let zone of _zones">{{zone.name}}</option>
                            </select>
                            <small [hidden]="form.controls.zone_id.pristine || !form.controls.zone_id.hasError('required')" class="inputError">Zone is required.</small>
                        </div>

                        <div class="form-group">
                            <label>Branch</label>
                            <select formControlName="branch_id" class="form-control">
                                <option [value]="''">--Select Branch--</option>
                                <option [value]="branch.id" *ngFor="let branch of _branches">{{branch.name}}</option>
                            </select>
                            <small [hidden]="form.controls.branch_id.pristine || !form.controls.branch_id.hasError('required')" class="inputError">Branch name is required.</small>
                        </div>
                        
                    </div>

                </div>


                <button type="submit" class="btn btn-info btn-fill pull-left" [disabled]="!form.valid">{{(_userId>0)?'Edit':'Add'}} User</button>
                <div class="clearfix"></div>
            </form>
        </div>
    </my-content>
    `
})

export class AddUserComponent implements OnInit {

    private form;

    private _branches;

    private _zones;

    private _userId;

    private _user;

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
              private _branchService: BranchService,
              private _zoneService: ZoneService,
              private _activatedRoute: ActivatedRoute){}

    ngOnInit(){

        this._activatedRoute.params.subscribe( params => this._userId = params['userId'] );

        this._branchService.getBranches().subscribe(
            result => this._branches = result.branches,
            error => this._notification.error('Error', error)
        );

        this._zoneService.getZones().subscribe(
            result => this._zones = result.zones,
            error => console.log(error)//this._notification.error('Error', error)
        );
        
        this.form = this._fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, CustomValidator.mailFormat])],
            password: ['', Validators.required],
            company: ['', Validators.required],
            branch_id: ['', Validators.required],
            role: ['', Validators.required],
            zone_id: [
                '',
                Validators.compose([
                    ConditionalValidator.conditional(
                        group => group.controls.role.value == 'zonal',
                        Validators.required
                    )
                ])
            ]
        });

        if(this._userId > 0) this.getUser(this._userId);
    }

    add(model: AddUserInterface, isValid: boolean){
        //if(!isValid) return;
        //console.log(model);
        this._userService.addUser(model, this._userId).subscribe(
            result => this._notification.success('Success', result.success),
            error => this._notification.error('Error', error)
        );
    }

    getUser(userId = 0){

        this._userService.getUsers(userId).subscribe(
            result => {
                this._user = result.resource;
                
                this.initFormGroup(this.form, { 
                        first_name: this._user.first_name,
                        last_name: this._user.last_name,
                        email: this._user.email,
                        company: this._user.company,
                        branch_id: this._user.branch_user[0].branch_id,
                        role: this._user.role,
                        zone_id: (this._user.role=='zonal' || this._user.role=='branch')? this._user.role_branch_zone_id : undefined
                    } 
                );

            },
            error => console.log(error)//this._notification.error('Error', error)
        );

    }

    initFormGroup(form: FormGroup, data: any) {

        for(var key in form.controls) {
            //console.log(key);
            if(form.controls[key] instanceof FormControl) {
                if(data[key]){
                let control = <FormControl>form.controls[key];
                this.initFormControl(control,data[key]);
                }
            } else if(form.controls[key] instanceof FormGroup) {
                if(data[key]){
                this.initFormGroup(<FormGroup>form.controls[key],data[key]);
                }
             } 
             //else if(form.controls[key] instanceof FormArray) {
            //     var control = <FormArray>form.controls[key];
            //     if(data[key])
            //     this.initFormArray(control, data[key]);
            // }
            }
      }

    //   initFormArray(array: FormArray, data: Array<any>){
    //     if(data.length>0){
    //         var clone = array.controls[0];
    //         array.removeAt(0);
    //         for(var idx in data) {
    //             array.push(_.cloneDeep(clone));
    //             if(clone instanceof FormGroup)
    //             this.initFormGroup(<FormGroup>array.controls[idx], data[idx]);
    //             else if(clone instanceof FormControl)
    //             this.initFormControl(<FormControl>array.controls[idx], data[idx]);
    //             else if(clone instanceof FormArray)
    //             this.initFormArray(<FormArray>array.controls[idx], data[idx]);
    //         }
    //     }
    // }

    initFormControl(control: FormControl, value:any){
        control.setValue(value);
    }

 }
