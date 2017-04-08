import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard'; 
import { Admin2Component } from './admin.component';
import { ViewBranchComponent } from './branch/view/view-branch.component';
import { AddBranchComponent } from './branch/add/add-branch.component';
import { ViewCategoryComponent } from './category/view/view-category.component';
import { AddCategoryComponent } from './category/add/add-category.component';
import { ViewSurveyComponent } from './survey/view/view-survey.component';
import { AddSurveyComponent } from './survey/add/add-survey.component';
import { ViewImageComponent } from './misc/image/view/view-image.component';
import { AddImageComponent } from './misc/image/add/add-image.component';
import { ViewResponseComponent } from './misc/response/view/view-response.component';
import { AddResponseComponent } from './misc/response/add/add-response.component';
import { ReportComponent } from './report/report.component';
import { BranchSurveyComponent } from './branch/branchSurveys/branch-surveys.component';
import { AddUserComponent } from './user/add/add-user.component';
import { ViewUserComponent } from './user/view/view-user.component';
import { AddZoneComponent } from './zones/add/add-zone.component';
 
export const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: Admin2Component,
        children: [
            { path: 'view_branches', component: ViewBranchComponent },
            { path: 'add_branch', component: AddBranchComponent },
            { path: 'view_categories', component: ViewCategoryComponent },
            { path: 'add_category', component: AddCategoryComponent },
            { path: 'view_surveys', component: ViewSurveyComponent },
            { path: 'add_survey', component: AddSurveyComponent },
            { path: 'view_images', component: ViewImageComponent },
            { path: 'add_image', component: AddImageComponent },
            { path: 'view_responses', component: ViewResponseComponent },
            { path: 'add_response/:responseId', component: AddResponseComponent },
            { path: 'report', component: ReportComponent },
            { path: 'branch-surveys/:branchId', component: BranchSurveyComponent },
            { path: 'view_users', component: ViewUserComponent },
            { path: 'add_user/:userId', component: AddUserComponent},
            { path: 'add_zone', component: AddZoneComponent},
            { path: '', component: ViewBranchComponent },
        ],
        canActivate:[AuthGuard]
        
    }
];