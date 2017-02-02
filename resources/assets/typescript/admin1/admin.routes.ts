import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard'; 
import { AdminComponent } from './admin.component';
import { ViewUserComponent } from './user/view/view-user.component';
import { AddUserComponent } from './user/add/add-user.component';
import { AddSurverComponent } from './survey/add/add-survey.component';
import { ViewSurveyComponent } from './survey/view/view-survey.component';
import { AddBranchComponent } from './branch/add/add-branch.component';
import { ViewBranchComponent } from './branch/view/view-branch.component';
import { MiscComponent } from './misc/misc.component';
 
export const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'add_user', component: AddUserComponent },
            { path: 'view_users', component: ViewUserComponent },
            { path: 'add_survey', component: AddSurverComponent },
            { path: 'view_surveys', component: ViewSurveyComponent },
            { path: 'add_branch', component: AddBranchComponent },
            { path: 'view_branches', component: ViewBranchComponent },
            { path: 'add_category', component: AddBranchComponent },
            { path: 'view_categories', component: ViewBranchComponent },
            { 
                path: 'misc', 
                component: MiscComponent,
                children: [
                    //{ path: 'add_user', component: AddUserComponent },
                    //{ path: '', component: ViewUserComponent }
                ] 
            },
            { path: '', component: ViewUserComponent }
        ],
        canActivate:[AuthGuard]
        
    }
];