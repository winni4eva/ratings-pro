System.register(['./auth.component', './login/login.component', './signup/signup.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var auth_component_1, login_component_1, signup_component_1;
    var AuthRoutes;
    return {
        setters:[
            function (auth_component_1_1) {
                auth_component_1 = auth_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            }],
        execute: function() {
            exports_1("AuthRoutes", AuthRoutes = [
                {
                    path: 'auth',
                    component: auth_component_1.AuthComponent,
                    children: [
                        { path: 'login', component: login_component_1.LoginComponent },
                        { path: 'signup', component: signup_component_1.SignUpComponent },
                        { path: '', component: login_component_1.LoginComponent }
                    ]
                },
            ]);
        }
    }
});

//# sourceMappingURL=auth.routes.js.map
