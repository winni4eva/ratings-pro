const elixir = require('laravel-elixir');

require('laravel-elixir-vue');
//require('elixir-typescript');
//var elixirTypscript = require('elixir-typescript');
// import the dependency
var elixirTypscript = require('elixir-typescript');
 
//require('laravel-elixir-typescript');


/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.sass('app.scss')
    .webpack('app.js')
    .copy('node_modules/@angular', 'public/@angular')
    .copy('node_modules/angular2-in-memory-web-api', 'public/angular2-in-memory-web-api')
    .copy('node_modules/angular2-notifications', 'public/angular2-notifications')
    .copy('node_modules/underscore', 'public/underscore')
    .copy('node_modules/core-js', 'public/core-js')
    .copy('node_modules/reflect-metadata', 'public/reflect-metadata')
    .copy('node_modules/systemjs', 'public/systemjs')
    .copy('node_modules/rxjs', 'public/rxjs')
    .copy('node_modules/zone.js', 'public/zone.js')
    .copy('node_modules/mydatepicker', 'public/mydatepicker')
    .copy('node_modules/lodash', 'public/lodash')
    .copy('node_modules/@types/lodash', 'public/@types/lodash')
    .copy('node_modules/ng2-pagination', 'public/ng2-pagination')


    .typescript(
        [
            'app.component.ts',
            'app.routes.ts',
            'app.module.ts',
            'main.ts',
            '*'
        ],
        'public\\app',
        {
            "target": "es5",
            "module": "system",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "removeComments": false,
            "noImplicitAny": false
        }
    );
});

//  {
//     "target": "es5",
//     "module": "system",
//     "moduleResolution": "node",
//     "sourceMap": true,
//     "emitDecoratorMetadata": true,
//     "experimentalDecorators": true,
//     "removeComments": false,
//     "noImplicitAny": false
//}

// mix.typescript('app.js','public/app', '/**/*.ts', {
//         "target": "es5",
//         "module": "system",
//         "moduleResolution": "node",
//         "sourceMap": true,
//         "emitDecoratorMetadata": true,
//         "experimentalDecorators": true,
//         "removeComments": false,
//         "noImplicitAny": false
//     });

// .typescript(
//         [
//             'app.component.ts',
//             'app.routes.ts',
//             'app.module.ts',
//             'main.ts',
//             '*'
//         ],
//         'public\\app',
//         {
//             "target": "es5",
//             "module": "system",
//             "moduleResolution": "node",
//             "sourceMap": true,
//             "emitDecoratorMetadata": true,
//             "experimentalDecorators": true,
//             "removeComments": false,
//             "noImplicitAny": false
//         }
//     );