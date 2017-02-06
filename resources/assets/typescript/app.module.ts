///<reference path="../../../typings/index.d.ts"/>
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestOptions, XHRBackend, Http, Request, RequestOptionsArgs, ConnectionBackend, BrowserXhr } from '@angular/http';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
//import { PaginationModule } from 'ng2-bootstrap';
//import { AdminComponent } from './admin/admin.component';
import { Admin2Component } from './admin2/admin.component';
//import { SignUpComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './admin2/header/header.component';
import { SideBarComponent } from './admin2/sidebar/sidebar.component';
import { ContentComponent } from './admin2/content/content.component';
import { ViewBranchComponent } from './admin2/branch/view/view-branch.component';
import { AddBranchComponent } from './admin2/branch/add/add-branch.component';
import { ViewCategoryComponent } from './admin2/category/view/view-category.component';
import { AddCategoryComponent } from './admin2/category/add/add-category.component';
import { ViewSurveyComponent } from './admin2/survey/view/view-survey.component';
import { AddSurveyComponent } from './admin2/survey/add/add-survey.component';
import { ViewImageComponent } from './admin2/misc/image/view/view-image.component';
import { AddImageComponent } from './admin2/misc/image/add/add-image.component';
import { ViewResponseComponent } from './admin2/misc/response/view/view-response.component';
import { AddResponseComponent } from './admin2/misc/response/add/add-response.component';
import { AddUserComponent } from './admin2/user/add/add-user.component';
import { ViewUserComponent } from './admin2/user/view/view-user.component';
import { ReportComponent } from './admin2/report/report.component';
import { BranchSurveyComponent } from './admin2/branch/branchSurveys/branch-surveys.component';
import { ZingChart } from './admin2/chart/zingchart.component';
import { Modal } from './shared/modal/modal.component';
// import { ContentHeaderComponent } from './admin/content/header/content-header.component';
// import { BoxesComponent } from './admin/content/main/boxes/boxes.component';
// import { TabsComponent } from './admin/content/main/tabs/tabs.component';
import { FooterComponent } from './admin2/footer/footer.component';
// import { AddUserComponent } from './admin/user/add/add-user.component';
// import { ViewUserComponent } from './admin/user/view/view-user.component';
// import { AddSurverComponent } from './admin/survey/add/add-survey.component';
// import { ViewSurveyComponent } from './admin/survey/view/view-survey.component';
// import { AddBranchComponent } from './admin/branch/add/add-branch.component';
// import { ViewBranchComponent } from './admin/branch/view/view-branch.component';
// import { MiscComponent } from './admin/misc/misc.component';
// import { AddCategoryComponent } from './admin/misc/category/add/add-cat.component';

import { routing } from './app.routes';
import { CustomHttp } from './shared/interceptor/interceptor.service';
import { MyRequestOptions } from './shared/interceptor/request-options';
import { LoginService } from './auth/login/login.service';
//import { CategoryService } from './admin/misc/category/cat.service';
import { BranchService } from './admin2/branch/branch.service';
import { CategoryService } from './admin2/category/category.service';
import { SurveyService } from './admin2/survey/survey.service';
import { MiscService } from './admin2/misc/misc.service';
import { StorageService } from './shared/storage/storage.service';
import { AuthGuard } from './auth/auth.guard';
import { SimpleNotificationsModule, SimpleNotificationsComponent, NotificationsService } from 'angular2-notifications';
import { FileService } from './shared/file-generator/file.service';
import { HomeService } from './home/home.service';
import { ReportService } from './admin2/report/report.service';
import { UserService } from './admin2/user/user.service';
//import { Ng2PaginationModule } from 'ng2-pagination';
//import {PaginatePipe, PaginationService} from 'ng2-pagination';
import { MyDatePickerModule } from 'mydatepicker';
//import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalService } from './shared/modal/modal.service';
//import { DataTableModule } from "angular2-datatable";

@NgModule({
    imports:      [ 
                    HttpModule, BrowserModule, routing, FormsModule, ReactiveFormsModule, 
                    SimpleNotificationsModule, MyDatePickerModule
                ],
    declarations: [ 
                    AppComponent, HomeComponent, LoginComponent, Admin2Component, SideBarComponent,
                    HeaderComponent, ContentComponent, ViewBranchComponent, FooterComponent,
                    AddBranchComponent, ViewCategoryComponent, AddCategoryComponent, ViewSurveyComponent,
                    AddSurveyComponent, ViewImageComponent, AddImageComponent, ViewResponseComponent, AddResponseComponent,
                    ReportComponent, ZingChart, Modal, BranchSurveyComponent, AddUserComponent, ViewUserComponent
                   // HeaderComponent, SideBarComponent, ContentHeaderComponent, BoxesComponent,
                   // TabsComponent, AddUserComponent, ViewUserComponent, AddSurverComponent,
                   // ViewSurveyComponent, AddBranchComponent, ViewBranchComponent, MiscComponent, AddCategoryComponent 
                ],
    providers: [
        LoginService, StorageService, AuthGuard,
        XHRBackend, BrowserXhr, 
        BranchService, CategoryService, SurveyService, MiscService,
        NotificationsService, FileService, HomeService, ReportService,
        ModalService, UserService,
        { provide: RequestOptions, useClass: MyRequestOptions },
        {   provide: Http,
            useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new CustomHttp(backend, defaultOptions),
            deps: [XHRBackend, RequestOptions]
        }
        //{provide: APP_BASE_HREF, useValue : '/' }
     ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }



