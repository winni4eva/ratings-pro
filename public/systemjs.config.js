/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({

        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': '@angular/core/bundles/core.umd.js',
            '@angular/common': '@angular/common/bundles/common.umd.js',
            '@angular/compiler': '@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': '@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': '@angular/http/bundles/http.umd.js',
            '@angular/router': '@angular/router/bundles/router.umd.js',
            '@angular/forms': '@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs':'rxjs',
            'angular2-in-memory-web-api': 'angular2-in-memory-web-api',
            'angular2-notifications': 'angular2-notifications',
            'underscore': 'underscore',
            'mydatepicker': 'mydatepicker',
            'angular2-datatable': 'angular2-datatable',
            'lodash':'lodash',
            '@swimlane/ngx-datatable':'@swimlane/ngx-datatable',
            'ng2-pagination': 'ng2-pagination'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'angular2-notifications': {
                main: 'components.js',
                defaultExtension: 'js'
            },
            'underscore':{
                main: './underscore.js', 
                defaultExtension: 'js'
            },
            'mydatepicker':{ 
                main: '/dist/my-date-picker.module.js',
                defaultExtension: 'js'
            },
            'angular2-datatable': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            'lodash': {
                main: '/lodash.js',
                defaultExtension: 'js'
            },
            '@swimlane/ngx-datatable': {
                main: 'release/index.js',
                defaultExtension: 'js'
            },
            'ng2-pagination': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }
    });
    
})(this);
