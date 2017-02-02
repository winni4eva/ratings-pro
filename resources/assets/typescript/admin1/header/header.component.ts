import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { StorageService } from '../../shared/storage/storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-header',
    template:
     `
     <!-- Logo -->
    <a class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>D</b>S</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>{{_info[0]?.company}}</b> [ {{_info[0]?.branches[0]?.name}} ]</span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <span class="hidden-xs">{{_info[0]?.last_name+' '+_info[0]?.first_name}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-right">
                  <a (click)="logout()" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
        </ul>
      </div>
    </nav>
    `
})

export class HeaderComponent implements OnInit, OnDestroy { 

    private _info;

    constructor(
              private _loginService: LoginService, 
              private _storageService: StorageService,
              private _router: Router){}

    ngOnInit(){
        this._info = (this._storageService.get('rUser'))?
                        JSON.parse(this._storageService.get('rUser')) : {};
        console.log(this._info[0].branches[0].name);
    }

    logout(){

        this._loginService.getLogout()
            .subscribe( response => {
                    console.log(response);
                    this._loginService.cleanAuthDetails();
                    this._router.navigate(['login']); 
                },
                error => {
                    console.log(error);
                }
            );
    }

    ngOnDestroy(){
      this._info = '';
    }
}
