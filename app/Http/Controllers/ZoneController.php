<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Services\Zone\ZoneService;

class ZoneController extends Controller
{

    protected $zoneService;

    public function __construct(ZoneService $zoneService){
        $this->zoneService = $zoneService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $zones = $this->zoneService->getZones([],[]);

       return response()->json(compact('zones'),200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($this->zoneService->saveZone($request->all()))
            return response()->json(['success'=>'Zone saved successfully...'],200);
        return response()->json(['error'=>'Error saving zone...'],403);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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

    public function addZoneBranch(Request $request)
    {
        logger($request);
        if( $this->zoneService->addZone( $request->all() ) )
            return response()->json(['success'=>'Zone added successfully...'],200);

        return response()->json(['error'=>'Error adding zone...'],403);
    }

    public function deleteZoneBranch($branchId, $zoneId)
    {
        logger($branchId. ' ' .$zoneId);
        if( $this->zoneService->removeZoneBranch( $branchId, $zoneId ) )
            return response()->json(['success'=>'Zone branch removed successfully...'],200);

        return response()->json(['error'=>'Error removing zone branch...'],403);
    }
}
