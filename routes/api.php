<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    //return $request->user();
})->middleware('auth:api');

/* Auth Routes */
Route::group(['namespace' => 'Auth'], function () {
    Route::get('logout', 'LoginController@logout');
    Route::post('login', 'LoginController@login');
    //Route::post("signup", 'RegisterController@signup');
});

/* Protected Routes */
Route::group(['prefix' => 'v1','middleware' => 'auth:api'], function () {
    Route::resource('categories','CategoryController');
    Route::resource('branches','BranchController');
    Route::resource('images','ImageController');
    Route::resource('responses','ResponseController');
    Route::resource('surveys','SurveyController');
    Route::resource('ratings','RatingController');
    Route::resource('files','FileController');
    Route::resource('reports','ReportController');
    Route::resource('branch_surveys','BranchSurveyController');
    Route::resource('users','UserController');
    Route::get('branch_surveys/survey/{surveyId}/branch/{branchId}','BranchSurveyController@destroy');
});
