import { Component, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
import { StorageService } from '../../shared/storage/storage.service';

@Component({
    selector: 'my-sidebar',
    template:
   `
   <div class="sidebar" data-color="purple" data-image="assets/img/sidebar-5.jpg">

    <!--

        Tip 1: you can change the color of the sidebar using: data-color="blue | azure | green | orange | red | purple"
        Tip 2: you can also add an image using data-image tag

    -->

    	<div class="sidebar-wrapper">
            <div class="logo">
                <a [routerLink]="['/home']" class="simple-text">
                    {{_info[0]?.company}}
                </a>
            </div>

            <ul class="nav">
                <li class="active">
                    <a [routerLink]="['/admin/view_surveys']">
                        <i class="pe-7s-graph"></i>
                        <p>Surveys</p>
                    </a>
                </li>
                <li class="">
                    <a [routerLink]="['/admin/add_survey']">
                        <i class="pe-7s-graph"></i>
                        <p>New Survey</p>
                    </a>
                </li>

                <li>
                    <a [routerLink]="['/admin/view_branches']">
                        <i class="pe-7s-user"></i>
                        <p>Branches</p>
                    </a>
                </li>
                <li>
                    <a [routerLink]="['/admin/add_branch']">
                        <i class="pe-7s-user"></i>
                        <p>New Branch</p>
                    </a>
                </li>

                <li>
                    <a [routerLink]="['/admin/view_categories']">
                        <i class="pe-7s-note2"></i>
                        <p>Categories</p>
                    </a>
                </li>
                <li>
                    <a [routerLink]="['/admin/add_category']">
                        <i class="pe-7s-note2"></i>
                        <p>New Category</p>
                    </a>
                </li>

                <li>
                    <a [routerLink]="['/admin/view_responses']">
                        <i class="pe-7s-news-paper"></i>
                        <p>Responses</p>
                    </a>
                </li>
                <li>
                    <a [routerLink]="['/admin/add_response']">
                        <i class="pe-7s-news-paper"></i>
                        <p>New Response</p>
                    </a>
                </li>

                <li>
                    <a [routerLink]="['/admin/view_images']">
                        <i class="pe-7s-science"></i>
                        <p>Images</p>
                    </a>
                </li>
                <li>
                    <a [routerLink]="['/admin/add_image']">
                        <i class="pe-7s-science"></i>
                        <p>New Image</p>
                    </a>
                </li>
                <li>
                    <a [routerLink]="['/admin/report']">
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

    constructor(
        private _storageService: StorageService){}

    ngOnInit(){
        this._info = (this._storageService.get('rUser'))?
                        JSON.parse(this._storageService.get('rUser')) : {};
    }

    ngOnDestroy(){
      this._info = '';
    }
 }
