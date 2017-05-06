System.register(['../auth/auth.guard', './admin.component', './branch/view/view-branch.component', './branch/add/add-branch.component', './category/view/view-category.component', './category/add/add-category.component', './survey/view/view-survey.component', './survey/add/add-survey.component', './misc/image/view/view-image.component', './misc/image/add/add-image.component', './misc/response/view/view-response.component', './misc/response/add/add-response.component', './report/report.component', './branch/branchSurveys/branch-surveys.component', './user/add/add-user.component', './user/view/view-user.component', './zones/add/add-zone.component', './zones/view/view-zones.component', './zones/zoneBranches/zone-branches.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var auth_guard_1, admin_component_1, view_branch_component_1, add_branch_component_1, view_category_component_1, add_category_component_1, view_survey_component_1, add_survey_component_1, view_image_component_1, add_image_component_1, view_response_component_1, add_response_component_1, report_component_1, branch_surveys_component_1, add_user_component_1, view_user_component_1, add_zone_component_1, view_zones_component_1, zone_branches_component_1;
    var AdminRoutes;
    return {
        setters:[
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
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
            function (report_component_1_1) {
                report_component_1 = report_component_1_1;
            },
            function (branch_surveys_component_1_1) {
                branch_surveys_component_1 = branch_surveys_component_1_1;
            },
            function (add_user_component_1_1) {
                add_user_component_1 = add_user_component_1_1;
            },
            function (view_user_component_1_1) {
                view_user_component_1 = view_user_component_1_1;
            },
            function (add_zone_component_1_1) {
                add_zone_component_1 = add_zone_component_1_1;
            },
            function (view_zones_component_1_1) {
                view_zones_component_1 = view_zones_component_1_1;
            },
            function (zone_branches_component_1_1) {
                zone_branches_component_1 = zone_branches_component_1_1;
            }],
        execute: function() {
            exports_1("AdminRoutes", AdminRoutes = [
                {
                    path: 'admin',
                    component: admin_component_1.Admin2Component,
                    children: [
                        { path: 'view_branches', component: view_branch_component_1.ViewBranchComponent },
                        { path: 'add_branch', component: add_branch_component_1.AddBranchComponent },
                        { path: 'view_categories', component: view_category_component_1.ViewCategoryComponent },
                        { path: 'add_category', component: add_category_component_1.AddCategoryComponent },
                        { path: 'view_surveys', component: view_survey_component_1.ViewSurveyComponent },
                        { path: 'add_survey', component: add_survey_component_1.AddSurveyComponent },
                        { path: 'view_images', component: view_image_component_1.ViewImageComponent },
                        { path: 'add_image', component: add_image_component_1.AddImageComponent },
                        { path: 'view_responses', component: view_response_component_1.ViewResponseComponent },
                        { path: 'add_response/:responseId', component: add_response_component_1.AddResponseComponent },
                        { path: 'report', component: report_component_1.ReportComponent },
                        { path: 'branch-surveys/:branchId', component: branch_surveys_component_1.BranchSurveyComponent },
                        { path: 'view_users', component: view_user_component_1.ViewUserComponent },
                        { path: 'add_user/:userId', component: add_user_component_1.AddUserComponent },
                        { path: 'add_zone', component: add_zone_component_1.AddZoneComponent },
                        { path: 'view_zones', component: view_zones_component_1.ViewZonesComponent },
                        { path: 'zone-branches/:zoneId', component: zone_branches_component_1.ZoneBranchesComponent },
                        { path: '', component: view_branch_component_1.ViewBranchComponent },
                    ],
                    canActivate: [auth_guard_1.AuthGuard]
                }
            ]);
        }
    }
});

//# sourceMappingURL=admin.routes.js.map
