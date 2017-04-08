import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { LoginService } from '../../auth/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'my-header',
    template:
   `
   <nav class="navbar navbar-default navbar-fixed">
            <div class="container-fluid">
                <!--
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Dashboard</a>
                </div>
                -->
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-left">
                        <!--
                        <li>
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-dashboard"></i>
                            </a>
                        </li>
                        
                        <li class="dropdown">
                              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-globe"></i>
                                    <b class="caret"></b>
                                    <span class="notification">5</span>
                              </a>
                              <ul class="dropdown-menu">
                                <li><a href="#">Notification 1</a></li>
                                <li><a href="#">Notification 2</a></li>
                                <li><a href="#">Notification 3</a></li>
                                <li><a href="#">Notification 4</a></li>
                                <li><a href="#">Another notification</a></li>
                              </ul>
                        </li>
                        
                        <li>
                           <a href="">
                                <i class="fa fa-search"></i>
                            </a>
                        </li>
                        -->
                    </ul>

                    <ul class="nav navbar-nav navbar-right">

                        <li class="dropdown" *ngIf="_info[0]?.role == 'admin'">
                              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    Branch
                                    <b class="caret"></b>
                              </a>
                              <ul class="dropdown-menu">
                                <li><a [routerLink]="['/admin/view_branches']">Branches</a></li>
                                <li><a [routerLink]="['/admin/add_branch']">New</a></li>
                              </ul>
                        </li>

                        <li class="dropdown" *ngIf="_info[0]?.role == 'admin'">
                              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    Survey
                                    <b class="caret"></b>
                              </a>
                              <ul class="dropdown-menu">
                                <li><a [routerLink]="['/admin/view_categories']">Categories</a></li>
                                <li><a [routerLink]="['/admin/add_category']">New</a></li>
                                <li class="divider"></li>
                                <li><a [routerLink]="['/admin/view_surveys']">Surveys</a></li>
                                <li><a [routerLink]="['/admin/add_survey']">New</a></li>
                              </ul>
                        </li>

                        <li class="dropdown" *ngIf="_info[0]?.role == 'admin'">
                              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    Misc
                                    <b class="caret"></b>
                              </a>
                              <ul class="dropdown-menu">
                                <li><a [routerLink]="['/admin/view_responses']">Responses</a></li>
                                <li><a [routerLink]="['/admin/add_response/0']">New</a></li>
                                <li class="divider"></li>
                                <li><a [routerLink]="['/admin/view_images']">Images</a></li>
                                <li><a [routerLink]="['/admin/add_image']">New</a></li>
                              </ul>
                        </li>

                        <li class="dropdown" *ngIf="_info[0]?.role == 'admin'">
                              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    User
                                    <b class="caret"></b>
                              </a>
                              <ul class="dropdown-menu">
                                <li><a [routerLink]="['/admin/view_users']">Users</a></li>
                                <li><a [routerLink]="['/admin/add_user/0']">New</a></li>
                              </ul>
                        </li>

                        <li class="dropdown" *ngIf="_info[0]?.role == 'admin'">
                              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    Zone
                                    <b class="caret"></b>
                              </a>
                              <ul class="dropdown-menu">
                                <li><a [routerLink]="['/admin/view_zones']">Zones</a></li>
                                <li><a [routerLink]="['/admin/add_zone']">New</a></li>
                              </ul>
                        </li>

                        <li class="dropdown">
                              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    SideBar Color
                                    <b class="caret"></b>
                              </a>
                              <ul class="dropdown-menu">
                                <li *ngFor="let color of _sideBarColors">
                                    <a (click)="sendSideBarColor(color)" style="cursor:pointer">{{color | uppercase}}</a>
                                </li>
                              </ul>
                        </li>

                        <li>
                            <a (click)="logout()" style="cursor:pointer">
                                Log out [ {{_info[0]?.first_name}} ]
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `
})

export class HeaderComponent {

    private _info;

    private _sideBarColors: Array<any> = ['blue', 'azure', 'green', 'orange', 'red', 'purple'];

    @Output("sideBarColor") selectedSideBarColor: EventEmitter<any> = new EventEmitter();

    constructor(
              private _loginService: LoginService, 
              private _storageService: StorageService,
              private _router: Router,
              private _notification: NotificationsService,
              private activatedRoute: ActivatedRoute){}

    ngOnInit(){
        //this.activatedRoute.params.subscribe(params => console.log(params) );

        this._info = (this._storageService.get('rUser'))?
                        JSON.parse(this._storageService.get('rUser')) : {};

    }

    logout(){

        this._loginService.getLogout()
            .subscribe( response => {
                    this._loginService.cleanAuthDetails();
                    this._router.navigate(['login']);
                    //this._notification.success('Success', response.success) 
                },
                error => this._notification.error('Error', error)
            );
    }

    private sendSideBarColor(selectedColor){
        this.selectedSideBarColor.emit( selectedColor );
    }
 }
