System.register(['../auth/auth.guard', './admin.component', './user/view/view-user.component', './user/add/add-user.component', './survey/add/add-survey.component', './survey/view/view-survey.component', './branch/add/add-branch.component', './branch/view/view-branch.component', './misc/misc.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var auth_guard_1, admin_component_1, view_user_component_1, add_user_component_1, add_survey_component_1, view_survey_component_1, add_branch_component_1, view_branch_component_1, misc_component_1;
    var AdminRoutes;
    return {
        setters:[
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            },
            function (admin_component_1_1) {
                admin_component_1 = admin_component_1_1;
            },
            function (view_user_component_1_1) {
                view_user_component_1 = view_user_component_1_1;
            },
            function (add_user_component_1_1) {
                add_user_component_1 = add_user_component_1_1;
            },
            function (add_survey_component_1_1) {
                add_survey_component_1 = add_survey_component_1_1;
            },
            function (view_survey_component_1_1) {
                view_survey_component_1 = view_survey_component_1_1;
            },
            function (add_branch_component_1_1) {
                add_branch_component_1 = add_branch_component_1_1;
            },
            function (view_branch_component_1_1) {
                view_branch_component_1 = view_branch_component_1_1;
            },
            function (misc_component_1_1) {
                misc_component_1 = misc_component_1_1;
            }],
        execute: function() {
            exports_1("AdminRoutes", AdminRoutes = [
                {
                    path: 'admin',
                    component: admin_component_1.AdminComponent,
                    children: [
                        { path: 'add_user', component: add_user_component_1.AddUserComponent },
                        { path: 'view_users', component: view_user_component_1.ViewUserComponent },
                        { path: 'add_survey', component: add_survey_component_1.AddSurverComponent },
                        { path: 'view_surveys', component: view_survey_component_1.ViewSurveyComponent },
                        { path: 'add_branch', component: add_branch_component_1.AddBranchComponent },
                        { path: 'view_branches', component: view_branch_component_1.ViewBranchComponent },
                        { path: 'add_category', component: add_branch_component_1.AddBranchComponent },
                        { path: 'view_categories', component: view_branch_component_1.ViewBranchComponent },
                        {
                            path: 'misc',
                            component: misc_component_1.MiscComponent,
                            children: []
                        },
                        { path: '', component: view_user_component_1.ViewUserComponent }
                    ],
                    canActivate: [auth_guard_1.AuthGuard]
                }
            ]);
        }
    }
});

//# sourceMappingURL=admin.routes.js.map
