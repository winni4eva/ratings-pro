<?php
namespace App\Domain\Repositories\Survey;

use App\Survey;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
// use App\Domain\Services\Zone\ZoneService;
// use App\Domain\Services\Branch\BranchService;

class SurveyRepo implements SurveyRepoInterface
{
    use AuthenticatesUsers;

    protected $model;

    // protected $zoneService;

    // protected $branchService;

    public function __construct(Survey $response)
    {
        $this->model = $response;
        // $this->zoneService = $zoneService;
        // $this->branchService = $branchService;
    }

    /**
     * save survey
     *
     * @param string $request
     * @return mixed
     */
    public function save($request)
    {
        return $this->model->create($request);
        // foreach($request as $survey){
        //     logger($survey);
        // }
        //return true;
    }

    /**
     * get all surveys
     *
     * @return mixed
     */
    public function get()
    {
        $allowedBranches = [];

        if($this->guard()->user()->role=='zonal'){
            //$zone = $this->zoneService->findZone( $this->guard()->user()->role_branch_zone_id );
            //$allowedBranches = collect(collect($zone)->get('zone_branches'))->pluck('branch_id')->toArray();
            $zone = \App\Zone::with('zoneBranches')->find( $this->guard()->user()->role_branch_zone_id );
            $allowedBranches = collect(collect($zone)->get('zone_branches'))->pluck('branch_id')->toArray();
        }elseif($this->guard()->user()->role=='branch'){
            $allowedBranches = [ $this->guard()->user()->role_branch_zone_id ];
        }elseif($this->guard()->user()->role=='admin'){
            //$allowedBranches = collect($this->branchService->getBranches())->pluck('id')->toArray();
            $allowedBranches = \App\Branch::pluck('id')->toArray();
        }

        $branchSurveys = \App\Branch::with('surveys.category')->whereIn('id', $allowedBranches)->get();

        return $branchSurveys->pluck('surveys')[0];

        return $this->model->with('category')->get();
    }

    public function getSurveyRatingsReport($request, $branches){
        
        //$surveys = $this->model->with('ratings')->get();

        $branchSurveys = \App\Branch::with('surveys.ratings')->whereIn('id', $branches)->get();

        //logger($branchSurveys->pluck('surveys'));
        $surveys = $branchSurveys->pluck('surveys')[0];

        $data = [];
        $chart = [];
        collect($surveys)->flatMap(function($survey) use(&$data){
            $data[] =  [ 
                        'text' => $survey->title, 
                        'values' => [collect( $survey->ratings )->count()] 
                    ];       
        });

        $chart[] = [
            'id' => str_random(6),
            'height' => 600,
            'width' => '100%',
            'data' => [
                'type' => 'pie3d',
                'title' => [
                    "text"=> "Surveys & Responses",
                    "font-size"=> "24px",
                    "adjust-layout"=>true
                ],
              'plotarea'=> [
                "margin"=> "dynamic 45 60 dynamic",
              ],
              'legend'=> [
                "layout"=> "float",
                "background-color"=> "none",
                "border-width"=> 0,
                "shadow"=> 0,
                "align"=>"center",
                "adjust-layout"=>true,
                "item"=>[
                "padding"=> 7,
                "marginRight"=> 17,
                "cursor"=>"hand"
              ]
            ],
                "plot"=>[
                            "tooltip"=>[ "text"=>"%t<br>%v" ]
                ],
                "series" => $data
            ]
        ]; 

        return $chart;
    }

}