<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Services\Survey\SurveyService;
use App\Domain\Services\User\UserService;
//use Illuminate\Foundation\Auth\AuthenticatesUsers;

class SurveyController extends Controller
{
    //use AuthenticatesUsers;

    protected $surveyService;

    protected $userService;

    public function __construct(SurveyService $surveyService, UserService $userService){
        //$old = ini_set('memory_limit', '8192M'); 
        $this->surveyService = $surveyService;
        $this->userService = $userService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$surveys = $this->userService->getUserSurveys($this->guard()->user()->id);

        //$branchSurveys = collect( collect($surveys)->get(0) )->get('branches');

        $surveys = $this->surveyService->getSurveys();
    
        return response()->json(compact('surveys'),200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //logger($request->all());
        if($this->surveyService->saveSurvey($request->all()))
            return response()->json(['success' => 'Survey saved successfully..'],200);
        
        return response()->json(['error' => 'Error saving survey..'],403);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
