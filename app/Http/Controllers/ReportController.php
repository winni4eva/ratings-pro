<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Services\Report\ReportService;

class ReportController extends Controller
{
    protected $reportService;

    public function __construct(ReportService $reportService){
        $this->reportService = $reportService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //logger( $this->getDateTimeDate( $request->get('from') )->format('Y-m-d') );
        $report = [];
        $raw = [];
    
        switch ($request->get('tab')) {
            case 'Overview':
                //logger("overview report");
                //$report = $this->reportService->getOverview( $request->all() );
                $report = $this->reportService->getSurveys( $request->all() );
                $raw = $this->reportService->getRawDataOverview( $request->all() );
                //logger($raw);
                break;
            case 'Surveys':
                $report = $this->reportService->getSurveys( $request->all() );
                break;
            case 'Ratings':
                $report = [];//$this->reportService->getRatings( $request->all() );
                break;
            case 'Branches':
                $report = $this->reportService->getOverview( $request->all() );
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
