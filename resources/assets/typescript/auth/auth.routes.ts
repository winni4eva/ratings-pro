import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component'; 
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
 
export const AuthRoutes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: '', component: LoginComponent }
        ]
    },
];