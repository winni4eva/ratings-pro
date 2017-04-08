import { Component, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../shared/storage/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CustomValidator } from '../../../shared/validator/custom-validator.service';
import { ZoneService } from '../zones.service';
import { AddZoneInterface } from './add-zone.model';
import { BranchService } from '../../branch/branch.service';

@Component({
    selector: 'my-add-zone',
    template:
   `
   <simple-notifications [options]="_options"></simple-notifications>

   <my-content [title]="'Add Zone'">
        <div class="content">
            <form autocomplete="off" [formGroup]="form" (ngSubmit)="add(form.value, form.valid)" novalidate>

                <div class="row">

                    <div class="col-md-6">

                        <div class="form-group">
                            <label>Zone/Region Name</label>
                            <input type="text" formControlName="name" class="form-control" placeholder="Name">
                            <small [hidden]="form.controls.name.pristine || !form.controls.name.hasError('required')" class="inputError">Zone name is required.</small>
                        </div>

                        <div class="form-group">
                            <label>Add Branches</label>
                            <select class="form-control" (change)="addBranch()" [(ngModel)]="_selectedBranch" [ngModelOptions]="{standalone: true}">
                                <option [value]="''">--Select Branch--</option>
                                <option [ngValue]="branch" *ngFor="let branch of _branches">{{branch.name}}</option>
                            </select>
                            <!--<small [hidden]="form.controls.branch_id.pristine || !form.controls.branch_id.hasError('required')" class="inputError">Branch name is required.</small>-->
                        </div>
                        
                    </div>

                    <div class="col-md-12">
                        <div *ngFor="let branch of form.controls.branches.controls; let i=index">

                            <div class="col-md-2" style="margin-right:1px !important">
                                
                                <div class="pull-right">
                                    <span (click)="removeBranch(i)">
                                        <i style="font-size:30px;cursor:pointer !important" class="pe-7s-close"></i>
                                    </span>
                                </div>

                                <a class="btn btn-default btn-block" style="border:2px solid black !important">{{form.get(getControlValue(i,'name')).value}}</a>
                            
                            </div>

                        </div>

                    </div>

                </div>


                <button type="submit" class="btn btn-info btn-fill pull-left" [disabled]="!form.valid">Add Zone</button>
                <div class="clearfix"></div>
            </form>
        </div>
    </my-content>
    `
})

export class AddZoneComponent implements OnInit {

    private form;

    private _branches;

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    }

    private _selectedBranch;

    constructor(
              private _storageService: StorageService,
              private _router: Router,
              private _notification: NotificationsService,
              private _fb: FormBuilder,
              private _zoneService: ZoneService,
              private _branchService: BranchService){}

    ngOnInit(){
        this._branchService.getBranches().subscribe(
            result => this._branches = result.branches,
            error => this._notification.error('Error', error)
        );
        
        this.form = this._fb.group({
            name: ['', Validators.required],
            branches: this._fb.array([])
        });
    }

    add(model: AddZoneInterface, isValid: boolean){
        //if(!isValid) return;
        this._zoneService.addZone(model).subscribe(
            result => this._notification.success('Success', result.success),
            error => console.log(error)//this._notification.error('Error', error.error)
        );
    }

    addBranch() {
        const control = <FormArray>this.form.controls['branches'];

        let push = true;

        for(let branch of control.value)
            if(branch.branch_id == this._selectedBranch.id)
                push=false;

        if(push)
            control.push(this.setBranch(this._selectedBranch.name, this._selectedBranch.id));
    }

    removeBranch(i: number) {
        const control = <FormArray>this.form.controls['branches'];
        control.removeAt(i);
    }

    setBranch(branchName: string, branchId: number) {
        return this._fb.group({
            name: [branchName],
            branch_id: [branchId]
        });
    }

    getControlValue(index, controlName, subIndex = -1, subControlName = ''): string{
        if(subIndex > -1 && subControlName){
            return `branches.${index}.${controlName}.${subIndex}.${subControlName}`;
        }else if(subIndex < 0 && subControlName){
            return `branches.${index}.${controlName}.${subControlName}`;
        }else{
            return `branches.${index}.${controlName}`;
        }
    }

 }
