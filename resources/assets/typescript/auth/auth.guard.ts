import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login/login.service';
import{ StorageService } from '../shared/storage/storage.service';

@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(
                private router: Router,
                private authService: LoginService,
                private storageService: StorageService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        if (this.authService.getIsLoggedIn()) return true;
        //  if (state.url !== '/login' && !this.authService.isAuthenticated()) {
        //     this.router.navigate(['/login']);
        //     return false;
        // }

        // return true;
        
        //Todo Logout on server
        this.storageService.remove('rToken');
        this.storageService.remove('rUser');
        this.storageService.remove('rAuth');
        this.router.navigate(['/login']);// Navigate to the login page

        return false;

        //this.authService.redirectUrl = state.url;// Store the attempted URL for redirecting
    }
}