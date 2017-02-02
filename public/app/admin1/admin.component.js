System.register(['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AdminComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AdminComponent = (function () {
                function AdminComponent() {
                    this._boxTitle = ["Branches", "Surveys", "Ratings", "Users"];
                    this._boxStat = [12, 7, 13, 3];
                    this._boxColors = ["bg-aqua", "bg-green", "bg-yellow", "bg-red"];
                }
                AdminComponent.prototype.getRandomBoxColor = function () {
                    return this._boxColors[this.getRandomIndex(this._boxColors)];
                };
                // getRandomBoxTitle(): string
                // {
                //     return this._boxTitle[this.getRandomIndex(this._boxTitle)];
                // }
                // getRandomStat(): number
                // {
                //     return this._boxStat[this.getRandomIndex(this._boxStat)];
                // }
                AdminComponent.prototype.getRandomIndex = function (data) {
                    return Math.floor(Math.random() * data.length);
                };
                AdminComponent = __decorate([
                    core_1.Component({
                        selector: 'my-admin',
                        template: "\n        <body class=\"hold-transition skin-blue sidebar-mini\">\n            <div class=\"wrapper\">\n\n              <header class=\"main-header\">\n                <my-header></my-header>  \n              </header>\n\n              <!-- Left side column. contains the logo and sidebar -->\n              <aside class=\"main-sidebar\">\n                <!--\n                <my-sidebar [link]=\"'/admin/add_user'\" [title]=\"'Add User'\"></my-sidebar>\n                <my-sidebar [link]=\"'/admin/view_users'\" [title]=\"'View Users'\"></my-sidebar>\n                --> \n                <my-sidebar [link]=\"'/admin/add_survey'\" [title]=\"'Add Survey'\"></my-sidebar>\n                <my-sidebar [link]=\"'/admin/view_surveys'\" [title]=\"'View Surveys'\"></my-sidebar> \n                <my-sidebar [link]=\"'/admin/add_branch'\" [title]=\"'Add Branch'\"></my-sidebar>\n                <my-sidebar [link]=\"'/admin/view_branches'\" [title]=\"'View Branches'\"></my-sidebar>\n                <my-sidebar [link]=\"'/admin/misc'\" [title]=\"'Misc'\"></my-sidebar> \n              </aside>\n\n              <!-- Content Wrapper. Contains page content -->\n              <div class=\"content-wrapper\">\n                <!-- Content Header (Page header) -->\n                <section class=\"content-header\">\n                    <my-content-header></my-content-header>\n                </section>\n\n                <!-- Main content -->\n                <section class=\"content\">\n\n                    <!-- Small boxes (Stat box) -->\n                    <div class=\"row\">\n                        <my-boxes [boxColor]=\"getRandomBoxColor()\" [boxTitle]=\"_boxTitle[0]\" [boxStat]=\"_boxStat[0]\"></my-boxes>\n                        <my-boxes [boxColor]=\"getRandomBoxColor()\" [boxTitle]=\"_boxTitle[1]\" [boxStat]=\"_boxStat[1]\"></my-boxes>\n                        <my-boxes [boxColor]=\"getRandomBoxColor()\" [boxTitle]=\"_boxTitle[2]\" [boxStat]=\"_boxStat[2]\"></my-boxes>\n                        <my-boxes [boxColor]=\"getRandomBoxColor()\" [boxTitle]=\"_boxTitle[3]\" [boxStat]=\"_boxStat[3]\"></my-boxes>\n                    </div>\n                    <!-- Small boxes (Stat box) -->\n\n                    <router-outlet></router-outlet>\n                </section>\n                <!-- /.content -->\n              </div>\n              <!-- /.content-wrapper -->\n\n              <footer class=\"main-footer\">\n                <my-footer></my-footer>\n              </footer>\n\n              <!-- Control Sidebar -->\n              <aside class=\"control-sidebar control-sidebar-dark\">\n              </aside>\n              <!-- /.control-sidebar -->\n\n              <!-- Add the sidebar's background. This div must be placed\n                  immediately after the control sidebar -->\n              <div class=\"control-sidebar-bg\"></div>\n              \n            </div>\n            <!-- ./wrapper -->\n        </body>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AdminComponent);
                return AdminComponent;
            }());
            exports_1("AdminComponent", AdminComponent);
        }
    }
});

//# sourceMappingURL=admin.component.js.map
