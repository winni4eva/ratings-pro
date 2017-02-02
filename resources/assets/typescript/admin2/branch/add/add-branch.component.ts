import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BranchInterface } from './add-branch.interface';
import { BranchService } from '../branch.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'my-add-branch',
    template:
   `
   <simple-notifications [options]="_options"></simple-notifications>

   <my-content [title]="'Add Branch'">
        <div class="content">
            <form autocomplete="off" [formGroup]="form" (ngSubmit)="add(form.value, form.valid)" novalidate>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Branch Name</label>
                            <input type="text" formControlName="name" class="form-control" placeholder="Branch name" value="">
                            <small [hidden]="form.controls.name.pristine || !form.controls.name.hasError('required')" class="inputError">Branch name is required.</small>
                        </div>
                    </div>
                </div>


                <button type="submit" class="btn btn-info btn-fill pull-left" [disabled]="!form.valid">Add Branch</button>
                <div class="clearfix"></div>
            </form>
        </div>
    </my-content>
    `
})

export class AddBranchComponent implements OnInit {

    private form;

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    }

    constructor(
        private _branchService: BranchService,
        private _notification: NotificationsService){}

     ngOnInit(){
        this.form = new FormGroup({
            name: new FormControl('', Validators.compose([Validators.required]))
        });
    }

    add(model: BranchInterface, isValid){
        if(!isValid) return;
        
        this._branchService.addBranch(model).subscribe(
            result => this._notification.success('Success', result.success),
            error => this._notification.error('Error', error)
        );
    }

 }
