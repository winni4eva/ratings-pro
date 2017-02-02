import { Routes, RouterModule } from '@angular/router';
import { AdminRoutes } from './admin2/admin.routes';
import { HomeRoutes } from './home/home.routes';
import { LoginRoutes } from './auth/login/login.routes';


const appRoutes : Routes = [
    ...AdminRoutes,
    ...HomeRoutes,
    ...LoginRoutes,
    {
        path: '',
        redirectTo: '/login',
        pathMatch:'full'
    }
];

export const routing = RouterModule.forRoot(appRoutes,{ useHash: true });
