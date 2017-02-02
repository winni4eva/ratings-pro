System.register(['./login.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var login_component_1;
    var LoginRoutes;
    return {
        setters:[
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            exports_1("LoginRoutes", LoginRoutes = [
                {
                    path: 'login',
                    component: login_component_1.LoginComponent
                },
            ]);
        }
    }
});

//# sourceMappingURL=login.routes.js.map
