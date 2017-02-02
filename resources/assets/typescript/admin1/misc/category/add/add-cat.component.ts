import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AddCatInterface } from './add-cat.interface';
import { CategoryService } from '../cat.service';

@Component({
    selector: 'my-add-category',
    template: `
          <div class="box box-warning">

            <!--
            <div class="box-header with-border">
              <h3 class="box-title">General Elements</h3>
            </div>
            -->
            
            <div class="box-body">
              <form role="form" [formGroup]="_catForm" (ngSubmit)="addCategory(_catForm.value, _catForm.valid)">
    
                <div>

                  <label class="control-label" for="category"><i class="fa fa-check"></i>Name</label>
                  
                  <input type="text" formControlName="name" class="form-control" id="name" placeholder="Enter name" />
                  
                  <span *ngIf="_catForm.controls.name.hasError('required')" class="help-block">Category name is required.</span>
                  <!--<span *ngIf="_catForm.controls.name.dirty && !_catForm.controls.name.hasError('minLength')" class="help-block">Category name should be at least 3 xters long.</span>-->
                
                </div>

                <div class="box-footer">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>

              </form>
            </div>
          </div>
    `
})

export class AddCategoryComponent implements OnInit {

    private _catForm;

    constructor(
                  private _catService: CategoryService,
                  private _fb: FormBuilder){}

    ngOnInit() {

          this._catForm = this._fb.group({
              name: ['', Validators.required]
          });
    }

    addCategory(model: AddCatInterface, isValid: boolean){

        if(!isValid) return;

        this._catService.postCategory(model)
            .subscribe( response => {
                    console.log(response); 
                },
                error => {
                    console.log(error);
                }
            );
    }
    
    
}
