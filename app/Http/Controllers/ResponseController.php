<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Services\Response\ResponseService;

class ResponseController extends Controller
{

    protected $responseService;

    public function __construct(ResponseService $responseService){
        $this->responseService = $responseService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $responses =  $this->responseService->getResponses($request->all());
        
        return response()->json(compact('responses'),200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($this->responseService->saveResponse($request->all()))
            return response()->json(['success'=>'Response saved successfully..'], 200);
        return response()->json(['error'=>'Error saving response..'], 401);
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
        logger("Made it to delete");
        return response()->json(['success'=>'Response removed successfully..'], 200);
    }
}
