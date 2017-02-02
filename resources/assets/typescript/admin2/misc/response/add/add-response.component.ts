import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ResponseInterface } from './add-response.interface';
import { MiscService } from '../../misc.service';
import { NotificationsService } from 'angular2-notifications';
import { ConditionalValidator } from '../../../../shared/validator/conditional-required.service';

@Component({
    selector: 'my-add-response',
    template:
   `
   <simple-notifications [options]="_options"></simple-notifications>

   <my-content [title]="'Add Response'">
        <div class="content">
            <form autocomplete="off" [formGroup]="form" (ngSubmit)="add(form.value, form.valid)" novalidate>

                <div class="col-md-6">
                    <div class="form-group">
                        <label>Response</label>
                        <input type="text" class="form-control" formControlName="name">
                        <small [hidden]="form.controls.name.pristine || !form.controls.name.hasError('required')" class="inputError">Response name is required.</small>
                    </div>
               </div>

               <div class="col-md-6">
                    <div class="form-group">
                        <label>Rater</label>
                        <select class="form-control" formControlName="rater">
                            <option [value]="">--Select Rater--</option>
                            <option [value]="0">No</option>
                            <option [value]="1">Yes</option>
                        </select>
                        <small [hidden]="form.controls.rater.pristine || !form.controls.rater.hasError('required')" class="inputError">Rater name is required.</small>
                    </div>
               </div>
               <!--<p>{{form.get('rater') | json}}</p>-->
               <!--<div class="row" formGroupName="raters">-->

                    <div class="col-md-6" [hidden]="form.controls.rater.value==0">
                        <div class="form-group">
                            <label>Score</label>
                            <input type="text" class="form-control" formControlName="score">
                            <small [hidden]="form.controls.score.pristine || !form.controls.score.hasError('required')" class="inputError">Score is required.</small>
                        </div>
                    </div>

                    <div class="col-md-6" [hidden]="form.controls.rater.value==0">
                            <div class="form-group">
                                <label>Image</label>
                                <select formControlName="image_id" class="form-control" (click)="onChange($event)">
                                    <option *ngFor="let image of _images; let i = index" value="{{image.id}}">
                                        Image {{i+1}}
                                    </option>
                                </select>
                            </div>
                    </div>
              <!--</div>-->

              <div class="col-md-3" *ngIf="_displayImage" [hidden]="form.controls.rater.value==0">
                <img [src]="_displayImage" class="img-thumbnail" style="width:250px;height:250px"/>
              </div>

              <div class="col-md-12">
                <button type="submit" class="btn btn-info btn-fill pull-left" [disabled]="!form.valid">Add Response</button>
              </div>
             
              <div class="clearfix"></div>
              
            </form>
        </div>
    </my-content>
    `
})

export class AddResponseComponent implements OnInit {

    private form;

    private _images;

    private _displayImage: string = '';

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
            name: ['',Validators.required],
            rater: ['',Validators.required],
            //raters: this._fb.group({
                score: [
                        '',
                        Validators.compose([
                            ConditionalValidator.conditional(
                                group => group.controls.rater.value == 1,
                                Validators.required
                            )
                        ])
                        ],
                image_id: [
                            '', 
                            Validators.compose([
                                ConditionalValidator.conditional(
                                    group => group.controls.rater.value == 1,
                                    Validators.required
                                )
                            ])
                            ]
             //})
        });

        this._miscService.getImages().subscribe(
            result => this._images = result.images,
            error => console.log(error)
        );
    }

    add(model: ResponseInterface, isValid){
        if(!isValid) return;
        
        this._miscService.addResponse(model).subscribe(
            result => this._notification.success('Success', result.success),
            error => this._notification.error('Error', error)
        );
    }

    onChange($event){
        for (let image of this._images) {
            if(image.id == this.form.controls['image_id'].value) this._displayImage = image.src;
        }
    }


 }
