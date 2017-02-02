import { Component } from '@angular/core';

@Component({
    selector: 'my-admin',
    template: `
        <body class="hold-transition skin-blue sidebar-mini">
            <div class="wrapper">

              <header class="main-header">
                <my-header></my-header>  
              </header>

              <!-- Left side column. contains the logo and sidebar -->
              <aside class="main-sidebar">
                <!--
                <my-sidebar [link]="'/admin/add_user'" [title]="'Add User'"></my-sidebar>
                <my-sidebar [link]="'/admin/view_users'" [title]="'View Users'"></my-sidebar>
                --> 
                <my-sidebar [link]="'/admin/add_survey'" [title]="'Add Survey'"></my-sidebar>
                <my-sidebar [link]="'/admin/view_surveys'" [title]="'View Surveys'"></my-sidebar> 
                <my-sidebar [link]="'/admin/add_branch'" [title]="'Add Branch'"></my-sidebar>
                <my-sidebar [link]="'/admin/view_branches'" [title]="'View Branches'"></my-sidebar>
                <my-sidebar [link]="'/admin/misc'" [title]="'Misc'"></my-sidebar> 
              </aside>

              <!-- Content Wrapper. Contains page content -->
              <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <section class="content-header">
                    <my-content-header></my-content-header>
                </section>

                <!-- Main content -->
                <section class="content">

                    <!-- Small boxes (Stat box) -->
                    <div class="row">
                        <my-boxes [boxColor]="getRandomBoxColor()" [boxTitle]="_boxTitle[0]" [boxStat]="_boxStat[0]"></my-boxes>
                        <my-boxes [boxColor]="getRandomBoxColor()" [boxTitle]="_boxTitle[1]" [boxStat]="_boxStat[1]"></my-boxes>
                        <my-boxes [boxColor]="getRandomBoxColor()" [boxTitle]="_boxTitle[2]" [boxStat]="_boxStat[2]"></my-boxes>
                        <my-boxes [boxColor]="getRandomBoxColor()" [boxTitle]="_boxTitle[3]" [boxStat]="_boxStat[3]"></my-boxes>
                    </div>
                    <!-- Small boxes (Stat box) -->

                    <router-outlet></router-outlet>
                </section>
                <!-- /.content -->
              </div>
              <!-- /.content-wrapper -->

              <footer class="main-footer">
                <my-footer></my-footer>
              </footer>

              <!-- Control Sidebar -->
              <aside class="control-sidebar control-sidebar-dark">
              </aside>
              <!-- /.control-sidebar -->

              <!-- Add the sidebar's background. This div must be placed
                  immediately after the control sidebar -->
              <div class="control-sidebar-bg"></div>
              
            </div>
            <!-- ./wrapper -->
        </body>
    `
})

export class AdminComponent {

    private _boxTitle: Array<string> = ["Branches","Surveys","Ratings","Users"];

    private _boxStat: Array<number> = [12,7,13,3];

    private _boxColors: Array<string> = ["bg-aqua","bg-green","bg-yellow","bg-red"];

    constructor(){}

    getRandomBoxColor(): string
    {
        return this._boxColors[this.getRandomIndex(this._boxColors)];
    }

    // getRandomBoxTitle(): string
    // {
    //     return this._boxTitle[this.getRandomIndex(this._boxTitle)];
    // }

    // getRandomStat(): number
    // {
    //     return this._boxStat[this.getRandomIndex(this._boxStat)];
    // }

    getRandomIndex(data: Array<any>): number
    {
        return Math.floor( Math.random() * data.length );
    }
 }
