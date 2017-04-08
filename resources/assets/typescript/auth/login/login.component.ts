import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidator } from '../../shared/validator/custom-validator.service';
import { LoginInterface } from './login.interface';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import {ReflectiveInjector} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'my-login',
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

      <simple-notifications [options]="_options"></simple-notifications>

      <div class="logmod">
          <div class="logmod__wrapper">

            <span class="logmod__close">Close</span>

            <div class="logmod__container">
              <ul class="logmod__tabs">
                <li data-tabtar="lgm-4" [ngClass]=""><a [routerLink]="['/login']">Login</a></li>
                <!--<li data-tabtar="lgm-1" [ngClass]=""><a [routerLink]="['/auth/signup']">Sign Up</a></li>-->
              </ul>

              <div class="logmod__tab-wrapper"><!-- Login / Signup Container -->
                  <div class="logmod__tab lgm-2">
                    <div class="logmod__heading">
                    <span class="logmod__heading-subtitle">Enter your email and password <strong>to sign in</strong></span>
                    </div> 
                    <div class="logmod__form">
                    <form autocomplete="off" [formGroup]="_loginForm" (ngSubmit)="login(_loginForm.value, _loginForm.valid)" novalidate class="simform">
                        <div class="sminputs">
                        <div class="input full">
                            <!--<label class="string optional" for="user-name">Email*</label>-->
                            <input class="string optional myInput" formControlName="email" maxlength="255" id="user-email" placeholder="Email" type="email" size="50" />
                            <small [hidden]="_loginForm.controls.email.pristine || !_loginForm.controls.email.hasError('required')" class="inputError">Email is required.</small>
                            <small [hidden]="!_loginForm.controls.email.hasError('incorrectMailFormat')" class="inputError">Email format should be <i>example@example.com</i>.</small>
                        </div>
                        </div>
                        <div class="sminputs">
                        <div class="input full">
                            <!--<label class="string optional" for="user-pw">Password *</label>-->
                            <input class="string optional myInput" formControlName="password" maxlength="255" id="user-pw" placeholder="Password" type="password" size="50" />
                            <small [hidden]="_loginForm.controls.password.pristine || !_loginForm.controls.password.hasError('required')" class="inputError">Password is required.</small>
                            <small [hidden]="!_loginForm.controls.password.hasError('minLength')" class="inputError">Passwors must be at least 5 xters long.</small>
                        </div>
                        </div>
                        <div class="simform__actions">
                        <button class="sumbit" name="commit" type="sumbit" [disabled]="!_loginForm.valid">Log In</button>
                        <span class="simform__actions-sidetext"><a class="special" role="link" href="#">Forgot your password?<br>Click here</a></span>
                        </div> 
                    </form>
                    </div> 
              </div>
            </div>
          </div>
        </div>

    `
})

export class LoginComponent implements OnInit {

    private _loginForm;

    private _options = {
        position: ["top", "right"],
        timeOut: 9000,
        lastOnBottom: true
    };

    constructor(
                  private _loginService: LoginService,
                  private _fb: FormBuilder,
                  private router: Router,
                  private _notification: NotificationsService){}

    ngOnInit() {
          
          if(this._loginService.getIsLoggedIn()) this.router.navigate(['admin']); 

          this._loginForm = this._fb.group({
              email: ['', [Validators.required, CustomValidator.mailFormat] ],
              password: ['', [Validators.required, Validators.minLength(5)]]
          });
    }

    login(model: LoginInterface, isValid: boolean){
        if(!isValid) return;

        this._loginService.postLogin(model)
            .subscribe( response => {
                    this._loginService.setAuthDetails(response);
                    //if(response.user[0].role=='admin')
                        //this.router.navigate(['admin']);
                    this.router.navigate(['admin/report']);
                },
                error => {
                    console.log(error);
                    this._notification.error('Error', error);
                }
            );
    }

    logout(){

        this._loginService.getLogout()
            .subscribe( response => {
                    console.log(response);
                    this._loginService.cleanAuthDetails();
                    this.router.navigate(['login']); 
                },
                error => {
                    this._loginService.cleanAuthDetails();
                    this.router.navigate(['login']); 
                    console.log(error);
                }
            );
    }
}
