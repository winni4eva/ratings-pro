import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ResponseInterface } from './add-response.interface';
import { MiscService } from '../../misc.service';
import { NotificationsService } from 'angular2-notifications';
import { ConditionalValidator } from '../../../../shared/validator/conditional-required.service';
import { ActivatedRoute } from '@angular/router';
//import * as _ from 'lodash';

@Component({
    selector: 'my-add-response',
    template:
   `
   <simple-notifications [options]="_options"></simple-notifications>

   <my-content [title]="(_responseId>0)? 'Edit Response' : 'Add Response'">
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
                            <option value="" [selected]="!form.get('rater').value">--Select Rater--</option>
                            <option [value]="0" [selected]="form.get('rater').value==0">No</option>
                            <option [value]="1" [selected]="form.get('rater').value==1">Yes</option>
                        </select>
                        <small [hidden]="form.controls.rater.pristine || !form.controls.rater.hasError('required')" class="inputError">Rater name is required.</small>
                    </div>
               </div>
               <!--<p>{{form.get('rater') | json}}</p>-->
               <!--<div class="row" formGroupName="raters">-->

                    <div class="col-md-6" *ngIf="form.controls.rater.value==1">
                        <div class="form-group">
                            <label>Score</label>
                            <input type="text" class="form-control" formControlName="score">
                            <small [hidden]="form.controls.score.pristine || !form.controls.score.hasError('required')" class="inputError">Score is required.</small>
                        </div>
                    </div>

                    <div class="col-md-6" *ngIf="form.controls.rater.value==1">
                            <div class="form-group">
                                <label>Image</label>
                                <select formControlName="image_id" class="form-control" (click)="onChange($event)">
                                    <option *ngFor="let image of _images; let i = index" [value]="image.id" [selected]="form.controls.image_id.value==image.id">
                                        Image {{i+1}}
                                    </option>
                                </select>
                            </div>
                    </div>
              <!--</div>-->

              <div class="col-md-3" *ngIf="_displayImage">
                <img [src]="_displayImage" class="img-thumbnail" style="width:250px;height:250px"/>
              </div>

              <div class="col-md-12">
                <button type="submit" class="btn btn-info btn-fill pull-left" [disabled]="!form.valid">{{(_responseId > 0)? 'Edit' : 'Add'}} Response</button>
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

    private _responseId;

    private _responses;

    constructor(
                private _miscService: MiscService, 
                private _fb: FormBuilder,
                private _notification: NotificationsService,
                private _activatedRoute: ActivatedRoute){}

     ngOnInit(){

        this._activatedRoute.params.subscribe( params => this._responseId = params['responseId'] );         


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

        if(this._responseId > 0) this.getResponses(this._responseId);


        this._miscService.getImages().subscribe(
            result => this._images = result.images,
            error => console.log(error)
        );
    }

    add(model: ResponseInterface, isValid){
        if(!isValid) return;
        
        this._miscService.addResponse(model, this._responseId).subscribe(
            result => this._notification.success('Success', result.success),
            error => this._notification.error('Error', error)
        );
    }

    getResponses(responseId = 0){

        this._miscService.getResponses(responseId).subscribe(
            result => {
                this._responses = result.responses;
                console.log(this._responses);
                this.initFormGroup(this.form, { 
                        name: this._responses[0].name, 
                        rater: (this._responses[0].rater)? 1 : 0 ,
                        score: (this._responses[0].rater)? this._responses[0].rater.score : undefined, 
                        image_id: (this._responses[0].rater)? this._responses[0].rater.image_id : undefined
                    } 
                );
                this._displayImage = (this._responses[0].rater)? this._responses[0].rater.image.src : undefined;
                //this.totalItems = result.responses.total;
            },
            error => this._notification.error('Error', error)
        );

    }

    onChange($event){
        for (let image of this._images) {
            if(image.id == this.form.controls['image_id'].value) this._displayImage = image.src;
        }
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
