import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard'; 
import { HomeComponent } from './home.component';
 
export const HomeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
        
    }
];