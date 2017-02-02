<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--<base href="/">-->

        <title>Ratings Pro</title>

        <!-- Tell the browser to be responsive to screen width -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

        <!-- Bootstrap 3.3.6 -->
        <!--{{Html::style('bootstrap/css/bootstrap.min.css')}}-->

        <!-- Font Awesome -->
        <!--{{Html::style('bootstrap/css/font-awesome.min.css')}}-->

        <!-- Ionicons -->
        <!--{{Html::style('bootstrap/css/ionicons.min.css')}}-->

        <!-- Admin Theme style -->
        <!--{{Html::style('dist/css/AdminLTE.min.css')}}-->

        <!-- AdminLTE Skins. Choose a skin from the css/skins folder instead of downloading all of them to reduce the load. -->
        <!--{{Html::style('dist/css/skins/_all-skins.min.css')}}-->

        <!-- iCheck -->
        <!--{{Html::style('plugins/iCheck/flat/blue.css')}}-->

        <!-- Morris chart -->
        <!--{{Html::style('plugins/morris/morris.css')}}-->

        <!-- jvectormap -->
        <!--{{Html::style('plugins/jvectormap/jquery-jvectormap-1.2.2.css')}}-->

        <!-- Date Picker -->
        <!--{{Html::style('plugins/datepicker/datepicker3.css')}}-->

        <!-- Daterange picker -->
        <!--{{Html::style('plugins/daterangepicker/daterangepicker.css')}}-->

        <!-- bootstrap wysihtml5 - text editor -->
        <!--{{Html::style('plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css')}}-->

        <!-- Bootstrap core CSS     -->
        {{Html::style('assets/css/bootstrap.min.css')}}

        <!-- Animation library for notifications   -->
        {{Html::style('assets/css/animate.min.css')}}

        <!--  Light Bootstrap Table core CSS    -->
        {{Html::style('assets/css/light-bootstrap-dashboard.css')}}

        {{Html::style('assets/css/font-awesome.min.css')}}


        <!--  CSS for Demo Purpose, don't include it in your project     -->
        {{Html::style('assets/css/demo.css')}}

        {{Html::style('assets/css/ionicons.min.css')}}


        <!--     Fonts and icons     -->
        <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="http://fonts.googleapis.com/css?family=Roboto:400,700,300" rel='stylesheet' type='text/css'>
        {{Html::style('assets/css/pe-icon-7-stroke.css')}}

        <!-- Home Styles -->
        {{Html::style('css/style.css')}}

        <style>
            .inputError{
                color:red;
            }
        /*
            .loading-placeholder-wrapper {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: table;
            }
            .loading-placeholder-wrapper .loading-placeholder-inner-wrapper {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            }
            .loading-placeholder-wrapper .loading-placeholder-inner-wrapper .loading-placeholder {
            display: inline-block;
            font-size: 40px;
            font-weight: 300;
            color: #949494;
            }
            */
        </style>

        <!--
        {{Html::script('js/jquery-2.1.0.js')}}
        {{Html::script('js/bootstrap.min.js')}}
        -->
        <!-- 1. Load libraries -->
        <!-- Polyfill(s) for older browsers -->
        <!--{{ Html::script('systemjs/dist/system.src.js')}}-->
         <!--   Core JS Files   -->
        {{Html::script("assets/js/jquery-1.10.2.js")}}
        {{Html::script("assets/js/bootstrap.min.js")}}

        <!--  Checkbox, Radio & Switch Plugins -->
        {{Html::script("assets/js/bootstrap-checkbox-radio-switch.js")}}

        <!--  Charts Plugin -->
        {{Html::script("assets/js/chartist.min.js")}}

        <!--  Notifications Plugin    -->
        {{Html::script("assets/js/bootstrap-notify.js")}}

        <!--  Google Maps Plugin    -->
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>

        <!-- Light Bootstrap Table Core javascript and methods for Demo purpose -->
        {{Html::script("assets/js/light-bootstrap-dashboard.js")}}

        <!-- Light Bootstrap Table DEMO methods, don't include it in your project! -->
        {{Html::script("assets/js/demo.js")}}

        <!--{{Html::script("assets/js/loader.js")}}-->
        <!--{{Html::script("assets/js/jsapi.js")}}-->
        <!--{{Html::script("chart.js/src/chart.js")}}-->
        {{Html::script("assets/js/zingchart.min.js")}}

        <!--
        {{ Html::script('js/jquery-2.1.0.js') }}
        {{ Html::script('js/bootstrap.min.js') }}
        -->
        <!-- 1. Load libraries -->
        <!-- Polyfill(s) for older browsers -->
        {{ Html::script('systemjs/dist/system.src.js') }}
        {{ Html::script('systemjs.config.js') }}
        {{ Html::script('core-js/client/shim.min.js') }}
        {{ Html::script('zone.js/dist/zone.js') }}
        {{ Html::script('reflect-metadata/Reflect.js') }}

        <!--<script src="https://www.gstatic.com/charts/loader.js"></script>-->
    <script>  
        //!important: You want to give this variable(var googleLoaded = false;). This is used to run multiple chart in your jade.
        //var googleLoaded = false;
    </script>
    <script >
        // google.load('visualization', '1.0', {
        //     'packages': ['corechart']
        // });
    </script>

        <script>
            System.import('app').catch(function(err){ console.error(err); });
        </script>
    </head>
    <!-- 3. Display the application -->
    <body>
        <div class="loading-placeholder-wrapper">
            <div class="loading-placeholder-inner-wrapper">
                <span class="loading-placeholder">
                    <my-app>Loading Ratings...</my-app>
                </span>
            </div>
        </div>
    </body>
</html>