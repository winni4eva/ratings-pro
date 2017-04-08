<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Services\Report\ReportService;
use App\Domain\Services\Zone\ZoneService;
use App\Domain\Services\Branch\BranchService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class ReportController extends Controller
{
    use AuthenticatesUsers;

    protected $reportService;

    protected $zoneService;

    protected $branchService;

    public function __construct(ReportService $reportService, ZoneService $zoneService, BranchService $branchService){
        $old = ini_set('memory_limit', '8192M'); 
        $this->reportService = $reportService;
        $this->zoneService = $zoneService;
        $this->branchService = $branchService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //logger( $this->getDateTimeDate( $request->get('from') )->format('Y-m-d') );
        $allowedBranches = [];

        if($this->guard()->user()->role=='zonal'){
            $zone = $this->zoneService->findZone( $this->guard()->user()->role_branch_zone_id );
            $allowedBranches = collect(collect($zone)->get('zone_branches'))->pluck('branch_id')->toArray();
        }elseif($this->guard()->user()->role=='branch'){
            $allowedBranches = [ $this->guard()->user()->role_branch_zone_id ];
        }elseif($this->guard()->user()->role=='admin'){
            //$allowedBranches = collect($this->branchService->getBranches())->pluck('id')->toArray();
            $allowedBranches = \App\Branch::pluck('id')->toArray();
        }

        if(empty($allowedBranches)) 
            return response()->json(['error'=>'User has no role defined'], 401);

        $report = [];
        $raw = [];
    
        switch ($request->get('tab')) {
            case 'Overview':
                //logger("overview report");
                //$report = $this->reportService->getOverview( $request->all() );
                $report = $this->reportService->getSurveys( 
                    $request->all(), 
                     $allowedBranches
                );

                $raw = $this->reportService->getRawDataOverview( $request->all(), $allowedBranches );
                //logger($raw);
                break;
            case 'Surveys':
            
                $report = $this->reportService->getSurveys( $request->all() );
                break;
            case 'Ratings':
                $report = []; //$this->reportService->getRatings( $request->all() );
                $raw = $this->reportService->getRatingsRawDataReport( $request->all(), $allowedBranches );
                break;
            case 'Branches':
                $report = $this->reportService->getOverview( $request->all(), $allowedBranches );
                break;
            default:
                # code...
                break;
        }
        return response()->json(compact('report','raw'),200);
    }

    protected function getDateTimeDate($period, $format = 'Y-m-d H:i:s'){
        return new \DateTime( date( $format, strtotime( $period ) ) );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        //
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
}
