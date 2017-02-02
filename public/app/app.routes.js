System.register(['@angular/router', './admin2/admin.routes', './home/home.routes', './auth/login/login.routes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, admin_routes_1, home_routes_1, login_routes_1;
    var appRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (admin_routes_1_1) {
                admin_routes_1 = admin_routes_1_1;
            },
            function (home_routes_1_1) {
                home_routes_1 = home_routes_1_1;
            },
            function (login_routes_1_1) {
                login_routes_1 = login_routes_1_1;
            }],
        execute: function() {
            appRoutes = admin_routes_1.AdminRoutes.concat(home_routes_1.HomeRoutes, login_routes_1.LoginRoutes, [
                {
                    path: '',
                    redirectTo: '/login',
                    pathMatch: 'full'
                }
            ]);
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true }));
        }
    }
});

//# sourceMappingURL=app.routes.js.map
