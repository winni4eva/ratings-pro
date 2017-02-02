import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ImageInterface } from './add-image.interface';
import { MiscService } from '../../misc.service';
import {NotificationsService} from 'angular2-notifications';


@Component({
    selector: 'my-add-image',
    template:
   `
   <simple-notifications [options]="_options"></simple-notifications>

   <my-content [title]="'Add Image'">
        <div class="content">
            <form autocomplete="off" [formGroup]="form" (ngSubmit)="add(form.value, form.valid)" novalidate>

                <div class="col-md-12">
                    <div class="form-group">
                        <label>Image</label>
                        <input type="file" formControlName="image" formControlName="image" class="form-control" placeholder="Book Image" (change)="onChange($event)">
                        <small [hidden]="form.controls.image.pristine || !form.controls.image.hasError('required')" class="inputError">Image is required.</small>
                    </div>
                </div>

                <button type="submit" class="btn btn-info btn-fill pull-left" [disabled]="!_files">Add Image</button>
                <div class="clearfix"></div>
            </form>
        </div>
    </my-content>
    `
})

export class AddImageComponent implements OnInit {

    private form;

    private _files;

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    }

    constructor(
                private _miscService: MiscService, 
                private _fb: FormBuilder,
                private _notification: NotificationsService){}

     ngOnInit(){

        this.form = this._fb.group({
            image: ['',Validators.required]
        });
    }

    add(model, isValid){
        if(!this._files) return;
        
        this._miscService.addImage(this._files).subscribe(
            result => this._notification.success('Success', result.success),
            error => this._notification.error('Error', error)
        );
    }

    onChange(event) {
        console.log('Image changed');
        //console.log(this.form.controls['image']);
        //this.form.controls['image'].setValue('image set');
        //this.form.controls['image'].setErrors({});
        var files = event.srcElement.files;
        this._files = files;

    }


 }
