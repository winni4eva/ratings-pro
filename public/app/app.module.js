System.register(['@angular/core', '@angular/http', '@angular/platform-browser', '@angular/forms', './app.component', './home/home.component', './admin2/admin.component', './auth/login/login.component', './admin2/header/header.component', './admin2/sidebar/sidebar.component', './admin2/content/content.component', './admin2/branch/view/view-branch.component', './admin2/branch/add/add-branch.component', './admin2/category/view/view-category.component', './admin2/category/add/add-category.component', './admin2/survey/view/view-survey.component', './admin2/survey/add/add-survey.component', './admin2/misc/image/view/view-image.component', './admin2/misc/image/add/add-image.component', './admin2/misc/response/view/view-response.component', './admin2/misc/response/add/add-response.component', './admin2/user/add/add-user.component', './admin2/user/view/view-user.component', './admin2/report/report.component', './admin2/branch/branchSurveys/branch-surveys.component', './admin2/chart/zingchart.component', './shared/modal/modal.component', './admin2/footer/footer.component', './app.routes', './shared/interceptor/interceptor.service', './shared/interceptor/request-options', './auth/login/login.service', './admin2/branch/branch.service', './admin2/category/category.service', './admin2/survey/survey.service', './admin2/misc/misc.service', './shared/storage/storage.service', './auth/auth.guard', 'angular2-notifications', './shared/file-generator/file.service', './home/home.service', './admin2/report/report.service', './admin2/user/user.service', 'mydatepicker', './shared/modal/modal.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, platform_browser_1, forms_1, http_2, app_component_1, home_component_1, admin_component_1, login_component_1, header_component_1, sidebar_component_1, content_component_1, view_branch_component_1, add_branch_component_1, view_category_component_1, add_category_component_1, view_survey_component_1, add_survey_component_1, view_image_component_1, add_image_component_1, view_response_component_1, add_response_component_1, add_user_component_1, view_user_component_1, report_component_1, branch_surveys_component_1, zingchart_component_1, modal_component_1, footer_component_1, app_routes_1, interceptor_service_1, request_options_1, login_service_1, branch_service_1, category_service_1, survey_service_1, misc_service_1, storage_service_1, auth_guard_1, angular2_notifications_1, file_service_1, home_service_1, report_service_1, user_service_1, mydatepicker_1, modal_service_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (sidebar_component_1_1) {
                sidebar_component_1 = sidebar_component_1_1;
            },
            function (content_component_1_1) {
                content_component_1 = content_component_1_1;
            },
            function (view_branch_component_1_1) {
                view_branch_component_1 = view_branch_component_1_1;
            },
            function (add_branch_component_1_1) {
                add_branch_component_1 = add_branch_component_1_1;
            },
            function (view_category_component_1_1) {
                view_category_component_1 = view_category_component_1_1;
            },
            function (add_category_component_1_1) {
                add_category_component_1 = add_category_component_1_1;
            },
            function (view_survey_component_1_1) {
                view_survey_component_1 = view_survey_component_1_1;
            },
            function (add_survey_component_1_1) {
                add_survey_component_1 = add_survey_component_1_1;
            },
            function (view_image_component_1_1) {
                view_image_component_1 = view_image_component_1_1;
            },
            function (add_image_component_1_1) {
                add_image_component_1 = add_image_component_1_1;
            },
            function (view_response_component_1_1) {
                view_response_component_1 = view_response_component_1_1;
            },
            function (add_response_component_1_1) {
                add_response_component_1 = add_response_component_1_1;
            },
            function (add_user_component_1_1) {
                add_user_component_1 = add_user_component_1_1;
            },
            function (view_user_component_1_1) {
                view_user_component_1 = view_user_component_1_1;
            },
            function (report_component_1_1) {
                report_component_1 = report_component_1_1;
            },
            function (branch_surveys_component_1_1) {
                branch_surveys_component_1 = branch_surveys_component_1_1;
            },
            function (zingchart_component_1_1) {
                zingchart_component_1 = zingchart_component_1_1;
            },
            function (modal_component_1_1) {
                modal_component_1 = modal_component_1_1;
            },
            function (footer_component_1_1) {
                footer_component_1 = footer_component_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            },
            function (interceptor_service_1_1) {
                interceptor_service_1 = interceptor_service_1_1;
            },
            function (request_options_1_1) {
                request_options_1 = request_options_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (branch_service_1_1) {
                branch_service_1 = branch_service_1_1;
            },
            function (category_service_1_1) {
                category_service_1 = category_service_1_1;
            },
            function (survey_service_1_1) {
                survey_service_1 = survey_service_1_1;
            },
            function (misc_service_1_1) {
                misc_service_1 = misc_service_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            },
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (file_service_1_1) {
                file_service_1 = file_service_1_1;
            },
            function (home_service_1_1) {
                home_service_1 = home_service_1_1;
            },
            function (report_service_1_1) {
                report_service_1 = report_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (mydatepicker_1_1) {
                mydatepicker_1 = mydatepicker_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            }],
        execute: function() {
            //import { DataTableModule } from "angular2-datatable";
            //import { NgxDatatableModule } from '@swimlane/ngx-datatable';
            //import { DataFilterPipe } from './shared/pipes/data-filter.pipe';
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            http_1.HttpModule, platform_browser_1.BrowserModule, app_routes_1.routing, forms_1.FormsModule, forms_1.ReactiveFormsModule,
                            angular2_notifications_1.SimpleNotificationsModule, mydatepicker_1.MyDatePickerModule
                        ],
                        declarations: [
                            app_component_1.AppComponent, home_component_1.HomeComponent, login_component_1.LoginComponent, admin_component_1.Admin2Component, sidebar_component_1.SideBarComponent,
                            header_component_1.HeaderComponent, content_component_1.ContentComponent, view_branch_component_1.ViewBranchComponent, footer_component_1.FooterComponent,
                            add_branch_component_1.AddBranchComponent, view_category_component_1.ViewCategoryComponent, add_category_component_1.AddCategoryComponent, view_survey_component_1.ViewSurveyComponent,
                            add_survey_component_1.AddSurveyComponent, view_image_component_1.ViewImageComponent, add_image_component_1.AddImageComponent, view_response_component_1.ViewResponseComponent, add_response_component_1.AddResponseComponent,
                            report_component_1.ReportComponent, zingchart_component_1.ZingChart, modal_component_1.Modal, branch_surveys_component_1.BranchSurveyComponent, add_user_component_1.AddUserComponent, view_user_component_1.ViewUserComponent
                        ],
                        providers: [
                            login_service_1.LoginService, storage_service_1.StorageService, auth_guard_1.AuthGuard,
                            http_2.XHRBackend, http_2.BrowserXhr,
                            branch_service_1.BranchService, category_service_1.CategoryService, survey_service_1.SurveyService, misc_service_1.MiscService,
                            angular2_notifications_1.NotificationsService, file_service_1.FileService, home_service_1.HomeService, report_service_1.ReportService,
                            modal_service_1.ModalService, user_service_1.UserService,
                            { provide: http_2.RequestOptions, useClass: request_options_1.MyRequestOptions },
                            { provide: http_2.Http,
                                useFactory: function (backend, defaultOptions) { return new interceptor_service_1.CustomHttp(backend, defaultOptions); },
                                deps: [http_2.XHRBackend, http_2.RequestOptions]
                            }
                        ],
                        bootstrap: [app_component_1.AppComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});

//# sourceMappingURL=app.module.js.map
