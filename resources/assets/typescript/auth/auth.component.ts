import { Component } from '@angular/core';

@Component({
    selector: 'my-auth',
    template: `
        <div class="logmod">
          <div class="logmod__wrapper">

            <span class="logmod__close">Close</span>

            <div class="logmod__container">
              <ul class="logmod__tabs">
                <li data-tabtar="lgm-2" [ngClass]=""><a [routerLink]="['/auth/login']">Login</a></li>
                <!--<li data-tabtar="lgm-1" [ngClass]=""><a [routerLink]="['/auth/signup']">Sign Up</a></li>-->
              </ul>

              <div class="logmod__tab-wrapper"><!-- Login / Signup Container -->
                  <router-outlet></router-outlet>
              </div>
            </div>
          </div>
        </div>

    `
})

export class AuthComponent {}
