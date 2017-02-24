import { Component } from '@angular/core';

@Component({
    selector: 'my-admin',
    template: `
    <div class="wrapper">
        <!-- SideBar -->
        <my-sidebar [color]="_sidBarColor"></my-sidebar>
        <!-- SideBar -->

        <div class="main-panel">
            <!-- Header-->
            <my-header (sideBarColor)="_sidBarColor=$event"></my-header>
            <!-- Header -->

            <!-- Content -->
            <router-outlet></router-outlet>
            <!-- Content -->


            <!-- Footer -->
            <!--<my-footer></my-footer>-->
            <!-- Footer -->
        </div>
    </div>
    `
})

export class Admin2Component {

    private _sidBarColor: string;

    constructor(){}

 }
