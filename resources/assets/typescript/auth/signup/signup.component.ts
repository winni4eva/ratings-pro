import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidator } from '../../shared/validator/custom-validator.service';
import { SignUpInterface } from './signup.interface';
import { AuthService } from '../auth.service';

@Component({
    selector: 'my-signup',
    template: `
        <style>
            .myLabel{margin:0px !important;}
            .myInput{
                width:100% !important;
                height:80% !important;
                outline:none !important;
                font-size:20px !important;
            }
            .inputError{color:red}
        </style>    

      <div class="logmod__tab lgm-1">
            <div class="logmod__heading">
                <span class="logmod__heading-subtitle">Enter your personal details <strong>to create an acount</strong></span>
            </div>
            <div class="logmod__form">
                <form autocomplete="off" [formGroup]="_signUpForm" (ngSubmit)="signup(_signUpForm.value, _signUpForm.valid)" novalidate class="simform">
                    
                    <div class="sminputs">
                        <div class="input full">
                            <!--<label class="string optional myLabel" for="email" *ngIf="!_signUpForm.controls.email.hasError('required') && !_signUpForm.controls.email.hasError('incorrectMailFormat')">Email*</label>-->
                            
                            <input class="string optional myInput" formControlName="email" id="email" name="email" placeholder="Email" type="email" />
                            
                            <small [hidden]="_signUpForm.controls.email.pristine || !_signUpForm.controls.email.hasError('required')" class="inputError">Email is required.</small>
                            <small [hidden]="!_signUpForm.controls.email.hasError('incorrectMailFormat')" class="inputError">Email format should be <i>example@example.com</i>.</small>
                        </div>
                    </div>

                    <div class="sminputs">
                        <div class="input full">
                            <!--<label class="string optional" for="first_name">Last Name*</label>-->
                            <input class="string optional myInput" formControlName="first_name" id="first_name" name="first_name" placeholder="First Name" type="text" />
                            <small [hidden]="_signUpForm.controls.first_name.pristine || !_signUpForm.controls.first_name.hasError('required')" class="inputError">First name is required.</small>
                        </div>
                    </div>

                    <div class="sminputs">
                        <div class="input full">
                            <!--<label class="string optional" for="last_name">Last Name*</label>-->
                            <input class="string optional myInput" formControlName="last_name" id="last_name" name="last_name" placeholder="Last Name" type="text" />
                            <small [hidden]="_signUpForm.controls.last_name.pristine || !_signUpForm.controls.last_name.hasError('required')" class="inputError">Last name is required.</small>
                        </div>
                    </div>

                    <div class="sminputs">
                        <div class="input full">
                            <!--<label class="string optional" for="company">Company*</label>-->
                            <input class="string optional myInput" formControlName="company" id="company" name="company" placeholder="Company" type="text" />
                            <small [hidden]="_signUpForm.controls.company.pristine || !_signUpForm.controls.company.hasError('required')" class="inputError">Company is required.</small>
                        </div>
                    </div>
                    
                    <div class="sminputs" formGroupName="passwords">
                        <div class="input string optional">
                            <!--<label class="string optional" for="user-pw">Password *</label>-->
                            <input class="string optional myInput" formControlName="password" id="user-pw" placeholder="Password" type="password" />
                            <small [hidden]="_signUpForm.controls.passwords.controls.password.pristine || !_signUpForm.controls.passwords.controls.password.hasError('required')" class="inputError">Password is required.</small>
                        </div>
                        <div class="input string optional">
                            <!--<label class="string optional" for="user-pw-repeat">Repeat password *</label>-->
                            <input class="string optional myInput" formControlName="password_confirmation" id="user-pw-repeat" placeholder="Repeat password" type="password" />
                            <small [hidden]="_signUpForm.controls.passwords.controls.password_confirmation.pristine || !_signUpForm.controls.passwords.controls.password_confirmation.hasError('required')" class="inputError">Password confirm is required.</small>
                            <small [hidden]="_signUpForm.controls.passwords.controls.password_confirmation.pristine || !_signUpForm.controls.passwords.controls.password_confirmation.hasError('notValid')" class="inputError">Password mismatch.</small>
                        </div>
                    </div>
                    
                    <div class="simform__actions">
                        <button class="sumbit" type="sumbit" [disabled]="!_signUpForm.valid">Create Account</button>
                        <span class="simform__actions-sidetext">By creating an account you agree to our <a class="special" href="#" target="_blank" role="link">Terms & Privacy</a></span>
                    </div> 

                </form>
            </div>  
        </div>
    `
})

export class SignUpComponent implements OnInit {

    private _signUpForm;

    constructor(
                private _authService: AuthService,
                private _fb: FormBuilder){}

    signup(model: SignUpInterface, isValid: boolean){

        if(!isValid) return;

        this._authService.postSignUp(model)
            .subscribe( response => {
                    console.log(response); 
                },
                error => {
                    console.log(error);
                }
            );
    }

    ngOnInit() {

        this._signUpForm = this._fb.group({
            email: ['', [Validators.required, CustomValidator.mailFormat] ],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            company: ['', Validators.required],
            passwords: this.initPasswordsFormGroup()
        });

        this.subscribeToFormChangesAndSetValidity();
    }

    subscribeToFormChangesAndSetValidity() {
        const myFormValueChanges$ = this._signUpForm.controls["passwords"].valueChanges;

        myFormValueChanges$.subscribe(x => {
            if(x.password === x.password_confirmation)
                this._signUpForm.controls["passwords"].controls["password_confirmation"].setErrors(null);
            else 
                this._signUpForm.controls["passwords"].controls["password_confirmation"].setErrors({ "notValid" : true});
            
        });
    }

    initPasswordsFormGroup() {
        const group = this._fb.group({
                                        password: ['', Validators.required],
                                        password_confirmation: ['',Validators.required]
                                    });

        return group;
    }
}
