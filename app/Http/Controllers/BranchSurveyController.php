<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Services\BranchSurvey\BranchSurveyService;

class BranchSurveyController extends Controller
{
    protected $branchSurveyService;

    public function __construct(BranchSurveyService $branchSurveyService){
        $this->branchSurveyService = $branchSurveyService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if( $this->branchSurveyService->saveBranchSurvey($request->all()) )
            return response()->json(['success'=>'Branch survey saved successfully...'], 200);
        return response()->json(['error'=>'Error saving branch survey...'], 403);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($surveyId, $branchId)
    {
        if( $this->branchSurveyService->removeBranchSurvey( ['survey_id'=>$surveyId,'branch_id'=>$branchId] ) )
            return response()->json(['success'=>'Branch survey removed successfully...'], 200);
        return response()->json(['error'=>'Error removing branch survey...'], 403);
    }
}
