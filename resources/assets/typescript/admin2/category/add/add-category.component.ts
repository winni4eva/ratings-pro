import { Component, OnInit  } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CategoryInterface } from './add-category.interface';
import { CategoryService } from '../category.service';
import { BranchService } from '../../branch/branch.service';
import { NotificationsService } from 'angular2-notifications';
import { MiscService } from '../../misc/misc.service';

@Component({
    selector: 'my-add-category',
    template:
   `
   <simple-notifications [options]="_options"></simple-notifications>

   <my-content [title]="'Add Category'">
        <div class="content">
            <form autocomplete="off" [formGroup]="form" (ngSubmit)="add(form.value, form.valid)" novalidate>

                <div class="row">

                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Category Name</label>
                            <input type="text" formControlName="name" class="form-control" placeholder="Category name" value="">
                            <small [hidden]="form.controls.name.pristine || !form.controls.name.hasError('required')" class="inputError">Category name is required.</small>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label>Image</label>
                        <select formControlName="image_id" class="form-control" (click)="onChange($event)">
                            <option *ngFor="let image of _images; let i = index" value="{{image.id}}">
                                Image {{i+1}}
                            </option>
                        </select>
                    </div>
              </div>

              <div class="col-md-3" *ngIf="_displayImage">
                <img [src]="_displayImage" class="img-thumbnail" style="width:250px;height:250px"/>
              </div>

              <div class="col-md-12">
                <button type="submit" class="btn btn-info btn-fill pull-left" [disabled]="!form.valid">Add Category</button>
              </div>

            <div class="clearfix"></div>
            </form>
        </div>
    </my-content>
    `
})

export class AddCategoryComponent implements OnInit {

    private form;

    private _branches;

    private _branchList;

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    }

    private _images;

    private _displayImage;

    constructor(
                private _categoryService: CategoryService, 
                private _branchService: BranchService,
                private _notification: NotificationsService,
                private _miscService: MiscService){}

     ngOnInit(){
        this._branchService.getBranches().subscribe(
            result => {
                this._branches = result.branches;
            },
            error => console.log(error)
        );

        this._miscService.getImages().subscribe(
            result => this._images = result.images,
            error => console.log(error)
        );
        
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            image_id: new FormControl('', [Validators.required])
        });
    }

    add(model: CategoryInterface, isValid){
        if(!isValid) return;
        
        this._categoryService.addCategory(model).subscribe(
            result => {
                console.log(result);
                this._notification.success('Success', result.message);
            },
            error => this._notification.error('Error', error)
        );
    }

    onChange($event){
        for (let image of this._images) {
            //console.log(image);
            if(image.id == this.form.controls['image_id'].value) this._displayImage = image.src;
        }
    }

 }
