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

        //logger( $request );
        //$branchSurvey = \App\BranchSurvey::first();
        
        $data = $this->model->select('responses.name as responseName' , 'raters.score', DB::raw('COUNT(ratings.response_id) as numberOfResponses') )
                    ->leftjoin('ratings','ratings.survey_id','=','surveys.id')
                    ->leftjoin('branches', 'ratings.branch_id', '=', 'branches.id')
                    ->leftjoin('responses', 'ratings.response_id', '=', 'responses.id')
                    ->leftjoin('raters', 'ratings.response_id', '=', 'raters.response_id')
                    ->where('ratings.branch_id', $request['branchId'])
                    ->where('ratings.survey_id', $request['surveyId'])
                    ->groupBy( DB::raw('responseName'), 'raters.score'  )
                    ->orderBy('raters.score','desc')
                    ->get();

        $chart = ['bar'=>[],'pie'=>[]];
        
        if($request['branchId'] && $request['surveyId'])
        {
            $branch = \App\Branch::find( $request['branchId'] );

            $survey = \App\Survey::find( $request['surveyId'] );
            
            $result = collect($data->toArray())->map(function($item,$key){
                return [
                    "values"=> [$item['numberOfResponses']],
                    "text"=> $item['responseName'],
                    //"backgroundColor"=> '#FF7965',
                    //"detached"=>true
                ];
            });

            //PIE CHART
            $chart['pie'][] = [
                'id' => str_random(6),
                'height' => 600,
                'width' => '100%',
                'data' => [
                    'type' => 'pie',
                    "title"=> [
                        "fontColor"=> "#8e99a9",
                        "text"=> 'Branch Survey Votes',
                        "align"=> "left",
                        "offsetX"=> 10,
                        "fontFamily"=> "Open Sans",
                        "fontSize"=> 25
                    ],
                    "subtitle"=> [
                        "offsetX"=> 10,
                        "offsetY"=> 10,
                        "fontColor"=> "#8e99a9",
                        "fontFamily"=> "Open Sans",
                        "fontSize"=> "16",
                        "text"=> "{$branch->name} branch, {$survey->title}",
                        "align"=> "left"
                    ],
                    "source"=> [
                        "text"=> 'gs.statcounter.com',
                        "fontColor"=> "#8e99a9",
                        "fontFamily"=> "Open Sans"
                    ],
                'plotarea'=> [
                    "margin"=> "20 0 0 0"
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
                        "borderColor"=> "#2B313B",
                        "borderWidth"=> 5,
                        // "slice"=> 90,
                        "valueBox"=> [
                            "placement"=> 'out',
                            "text"=> '%t\n%npv% ( %v vote(s) )',
                            "fontFamily"=> "Open Sans"
                        ],
                        "tooltip"=>[
                            "fontSize"=> '18',
                            "fontFamily"=> "Open Sans",
                            "padding"=> "5 10",
                            "text"=> "%npv%"
                        ],
                        "animation"=>[
                            "effect"=> 2, 
                            "method"=> 5,
                            "speed"=> 900,
                            "sequence"=> 1,
                            "delay"=> 3000
                        ]
                        ],
                    "series" => $result
                ]
            ];

            //BAR CHART
            $chart['bar'][] = [
            'id' => str_random(6),
            'height' => 600,
            'width' => '100%',
            'data' => [
                'type' => 'bar',
                "title"=> [
                        "fontColor"=> "#8e99a9",
                        "text"=> 'Branch Survey Votes',
                        "align"=> "left",
                        "offsetX"=> 10,
                        "fontFamily"=> "Open Sans",
                        "fontSize"=> 25
                    ],
                    // "subtitle"=> [
                    //     "offsetX"=> 10,
                    //     "offsetY"=> 10,
                    //     "fontColor"=> "#8e99a9",
                    //     "fontFamily"=> "Open Sans",
                    //     "fontSize"=> "16",
                    //     "text"=> "{$branch->name} branch, {$survey->title}",
                    //     "align"=> "left"
                    // ],
                    "source"=> [
                        "text"=> 'gs.statcounter.com',
                        "fontColor"=> "#8e99a9",
                        "fontFamily"=> "Open Sans"
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
                        "text"=> "%t [ %v vote(s) ]",
                        //"placement"=> "top-out",
                        "font-color"=> "black",
                        //"angle"=> -60,
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
                "series" => $result
            ]
        ];

        }
        return $chart;
    }

}