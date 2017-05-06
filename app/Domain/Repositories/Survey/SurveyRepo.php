<?php
namespace App\Domain\Repositories\Survey;

use App\Survey;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use DB;
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
        //$allowedBranches = [];

        // if($this->guard()->user()->role=='zonal'){
        //     //$zone = $this->zoneService->findZone( $this->guard()->user()->role_branch_zone_id );
        //     //$allowedBranches = collect(collect($zone)->get('zone_branches'))->pluck('branch_id')->toArray();
        //     $zone = \App\Zone::with('zoneBranches')->find( $this->guard()->user()->role_branch_zone_id );
        //     $allowedBranches = collect(collect($zone)->get('zone_branches'))->pluck('branch_id')->toArray();
        // }elseif($this->guard()->user()->role=='branch'){
        //     $allowedBranches = [ $this->guard()->user()->role_branch_zone_id ];
        // }elseif($this->guard()->user()->role=='admin'){
        //     //$allowedBranches = collect($this->branchService->getBranches())->pluck('id')->toArray();
        //     $allowedBranches = \App\Branch::pluck('id')->toArray();
        // }

        //$surveys = $this->model->leftjoin('branch_surveys','branch_surveys.survey_id','=','surveys.id')
                    //->leftjoin('branches','branches.id','=','branch_surveys.branch_id')
                    //->leftjoin('categories','categories.id','=','surveys.category_id')
                    //->whereIn('branches.id', $allowedBranches)
                    //->select(['surveys.title','branches.name','branches.id'])
                    //->distinct()
                    //->get();

        //logger('',$allowedBranches);
        //logger( collect($surveys)->whereIn('id', $allowedBranches) );

        //$branchSurveys = \App\Branch::with('surveys.category')
                            //->whereIn('id', $allowedBranches)
                            //->get();
        //logger( $branchSurveys );
        //return collect($branchSurveys->pluck('surveys'))->get(0);

        return $this->model->with('category')->get();
    }

    public function getSurveyRatingsReport($request, $branches){
        
        //$surveys = $this->model->with('ratings')->get();

        $branchSurveys = \App\Branch::with('surveys.ratings')->whereIn('id', $branches)->get();
        $branchRatings = [];

        $branchSurveys->each(function($item,$key)use(&$branchRatings){

            $branchName = collect($item->toArray())->get('name');

            if( !(collect($branchRatings)->pluck("text")->search($branchName) > -1) )
                $branchRatings[] = ["text" => $branchName, "values" => []];
 
            $unAttacehdSurveys = \App\Survey::whereNotIn('id', collect( collect( $item->toArray() )->get('surveys') )->pluck('id'))->pluck('title');
                
            collect( collect( $item->toArray() )->get('surveys') )->each(function($itemSurvey, $i)use($branchName, &$branchRatings){
                $branchRatings[ collect($branchRatings)->pluck("text")->search($branchName) ]["values"][] = [collect($itemSurvey)->get('title'), collect( collect($itemSurvey)->get('ratings') )->count() ];
            });

            collect( $unAttacehdSurveys )->each(function($title, $j)use(&$branchRatings,$branchName, $unAttacehdSurveys){
                $branchRatings[ collect($branchRatings)->pluck("text")->search($branchName) ]["values"][] = [ $title, 0 ];
                
                if(($j+1)==count($unAttacehdSurveys))
                    $branchRatings[ collect($branchRatings)->pluck("text")->search($branchName) ]["values"] = collect($branchRatings[ collect($branchRatings)->pluck("text")->search($branchName) ]["values"])->sort()->values()->all();
            });

        });

        //logger( $branchRatings );

        $surveys = collect($branchSurveys->pluck('surveys'))->get(0);
        
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
                'type' => 'bar3d',
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
                    "tooltip"=>[ "text"=>"%t<br>%v" ],
                    "valueBox"=> [
                        "text"=> "%t ( %v )",
                        //"placement"=> "top-out",
                        "font-color"=> "black",
                        "angle"=> -60,
                        "offset-y"=> 5,
                        "padding"=> "15%"
                    ],
                    "animation"=> [
                        "delay"=> "100",
                        "effect"=> "4",
                        "method"=> "5",
                        "sequence"=> "1"
                    ],
                    "stacked"=>false,
                    "stack-type"=>"normal"
                ],
                "series" => $branchRatings
            //     "series" => [ 
            //     [
            //         "values"=>[["Quality Of Service",20],["Saturday Banking",40],["Loans",25]],
            //         "text"=> "Spintex"
            //     ], 
            //     [
            //         "values"=>[["Quality Of Service",5],["Saturday Banking",10],["Loans",21]],
            //         "text"=> "Kumasi"
            //     ], 
            //     [
            //         "values"=>[["Quality Of Service",30],["Saturday Banking",5],["Loans",18]],
            //         "text"=> "Tamale"
            //     ] 
            //   ]
            ]
        ]; 

        return $chart;
    }

}