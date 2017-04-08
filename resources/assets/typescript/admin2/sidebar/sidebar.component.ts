import { Component, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
import { StorageService } from '../../shared/storage/storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-sidebar',
    template:
   `
   <div class="sidebar" [attr.data-color] ="sideBarColor" data-image="assets/img/sidebar-5.jpg">
    <!--

        Tip 1: you can change the color of the sidebar using: data-color="blue | azure | green | orange | red | purple"
        Tip 2: you can also add an image using data-image tag

    -->

    	<div class="sidebar-wrapper">
            
            <div class="logo">
                <a [routerLink]="['/home']" target="_blank" class="simple-text">
                    {{_info[0]?.company}}
                </a>
            </div>

            <ul class="nav">

                <li [ngClass]="{'active': _activeTab=='view_surveys'}" *ngIf="_info[0]?.role == 'admin'">
                    <a (click)="setActiveTab('view_surveys')" [routerLink]="['/admin/view_surveys']">
                        <i class="pe-7s-graph"></i>
                        <p>Surveys</p>
                    </a>
                </li>

                <li [ngClass]="{'active': _activeTab=='add_survey'}" *ngIf="_info[0]?.role == 'admin'">
                    <a (click)="setActiveTab('add_survey')" [routerLink]="['/admin/add_survey']">
                        <i class="pe-7s-graph"></i>
                        <p>New Survey</p>
                    </a>
                </li>

                <li [ngClass]="{'active': _activeTab=='view_branches'}" *ngIf="_info[0]?.role == 'admin'">
                    <a (click)="setActiveTab('view_branches')" [routerLink]="['/admin/view_branches']">
                        <i class="pe-7s-user"></i>
                        <p>Branches</p>
                    </a>
                </li>
                <li [ngClass]="{'active': _activeTab=='add_branch'}" *ngIf="_info[0]?.role == 'admin'">
                    <a (click)="setActiveTab('add_branch')" [routerLink]="['/admin/add_branch']">
                        <i class="pe-7s-user"></i>
                        <p>New Branch</p>
                    </a>
                </li>

                <li [ngClass]="{'active': _activeTab=='view_categories'}" *ngIf="_info[0]?.role == 'admin'">
                    <a (click)="setActiveTab('view_categories')" [routerLink]="['/admin/view_categories']">
                        <i class="pe-7s-note2"></i>
                        <p>Categories</p>
                    </a>
                </li>
                <li [ngClass]="{'active': _activeTab=='add_category'}" *ngIf="_info[0]?.role == 'admin'">
                    <a (click)="setActiveTab('add_category')" [routerLink]="['/admin/add_category']">
                        <i class="pe-7s-note2"></i>
                        <p>New Category</p>
                    </a>
                </li>

                <li [ngClass]="{'active': _activeTab=='view_responses'}" *ngIf="_info[0]?.role == 'admin'">
                    <a (click)="setActiveTab('view_responses')" [routerLink]="['/admin/view_responses']">
                        <i class="pe-7s-news-paper"></i>
                        <p>Responses</p>
                    </a>
                </li>
                <li [ngClass]="{'active': _activeTab=='add_response'}" *ngIf="_info[0]?.role == 'admin'">
                    <a (click)="setActiveTab('add_response')" [routerLink]="['/admin/add_response/0']">
                        <i class="pe-7s-news-paper"></i>
                        <p>New Response</p>
                    </a>
                </li>

                <li [ngClass]="{'active': _activeTab=='view_images'}" *ngIf="_info[0]?.role == 'admin'">
                    <a (click)="setActiveTab('view_images')" [routerLink]="['/admin/view_images']">
                        <i class="pe-7s-science"></i>
                        <p>Images</p>
                    </a>
                </li>
                <li [ngClass]="{'active': _activeTab=='add_image'}" *ngIf="_info[0]?.role == 'admin'">
                    <a (click)="setActiveTab('add_image')" [routerLink]="['/admin/add_image']">
                        <i class="pe-7s-science"></i>
                        <p>New Image</p>
                    </a>
                </li>
                <li [ngClass]="{'active': _activeTab=='report'}">
                    <a (click)="setActiveTab('report')" [routerLink]="['/admin/report']">
                        <i class="pe-7s-map-marker"></i>
                        <p>Reports</p>
                    </a>
                </li>
                
                <!--
                <li>
                    <a href="notifications.html">
                        <i class="pe-7s-bell"></i>
                        <p>Notifications</p>
                    </a>
                </li>
				<li class="active-pro">
                    <a href="upgrade.html">
                        <i class="pe-7s-rocket"></i>
                        <p>Upgrade to PRO</p>
                    </a>
                </li>
                -->
            </ul>
    	</div>
    </div>
    `
})

export class SideBarComponent implements OnInit, OnDestroy {

    private _info;

    private _activeTab: string;

    @Input('color') sideBarColor;

    private _colorArray = ['blue', 'azure', 'green', 'orange', 'red', 'purple'];

    constructor(
        private _storageService: StorageService,
        private activatedRoute: ActivatedRoute){}

    ngOnInit(){

        //this.activatedRoute.params.subscribe(params => console.log(params) );

        this._info = (this._storageService.get('rUser'))?
                        JSON.parse(this._storageService.get('rUser')) : {};
        
        if(!this.sideBarColor)
            this.sideBarColor = this._colorArray[ Math.floor((Math.random() * this._colorArray.length) + 1) ];
    }

    setActiveTab(tab){
        this._activeTab = tab;
    }

    ngOnDestroy(){
      this._info = '';
    }
 }
