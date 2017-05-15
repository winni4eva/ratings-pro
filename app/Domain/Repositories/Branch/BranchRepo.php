<?php
namespace App\Domain\Repositories\Branch;

use App\Branch;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use DB;
// use App\Domain\Services\Zone\ZoneService;
// use App\Domain\Services\Branch\BranchService;

class BranchRepo implements BranchRepoInterface
{
    use AuthenticatesUsers;

    protected $model;

    // protected $zoneService;

    // protected $branchService;

    public function __construct(Branch $branch)
    {
        $this->model = $branch;
        // $this->zoneService = $zoneService;
        // $this->branchService = $branchService;
    }

    /**
     * save user data
     *
     * @param array $request
     * @return mixed
     */
    public function save(array $request)
    {
        return $this->model->create($request);
    }

    /**
     * Get branches
     *
     * @param array $request
     * @param array $request
     * @return mixed
     */
    public function get(array $request, array $fields = []){
        // if(collect($fields)->count()>0)
        // {
        //     foreach($fields as $field) $query = $this->model->where($field, $request[$field]);

        //     return $query->get();
        // }

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

        return $this->model->with('surveys')->whereIn('id', $allowedBranches)->get();
    }

    /**
     * Save branch users
     *
     * @param object $user
     * @param array $request
     * @param bool $admin
     * @return mixed
     */
    public function saveBranchUser(User $user, array $request, $admin = false){
        $branch = $user->branches()->firstOrCreate($request);

        if($admin) $user->branches()->sync([$branch->id => [ 'admin' => $admin] ], false);

        ////User::find(1)->roles()->detach();

        return $branch;
    }

    // public function getBranchesReport($request){
    //     $result = $this->model->with('surveys')->get();
    //     logger( collect( $result )->keys() );
    //     return [];
    // }

    public function getBranchesSurveysReport($request, $branches){
        
        $ratings = \App\Rating::select('surveys.title', 'branches.name' , 'responses.name as responseName', 'raters.score', DB::raw('COUNT(ratings.response_id) as numberOfResponses'), DB::raw('( COUNT(ratings.response_id)*raters.score) as totalScore') )
                        ->leftjoin('surveys', 'ratings.survey_id', '=', 'surveys.id')
                        ->leftjoin('branches', 'ratings.branch_id', '=', 'branches.id')
                        ->leftjoin('responses', 'ratings.response_id', '=', 'responses.id')
                        ->leftjoin('raters', 'ratings.response_id', '=', 'raters.response_id')
                        //->leftJoin(DB::raw('(SELECT SUM(score) AS sum, COUNT(*) as total FROM raters) as r'),'ratings.response_id', '=', 'raters.response_id')
                        //->leftJoin(DB::raw('(SELECT COUNT(*) as totalResponses FROM rat) as r'),'ratings.response_id', '=', 'raters.response_id')
                        ->whereIn('ratings.branch_id', $branches)
                        //->groupBy('surveys.title','branches.name','raters.score','r.sum','r.total')
                        ->groupBy('surveys.title','branches.name', DB::raw('responseName'), 'raters.score' )
                        ->get();
        
        $chart = ['bar'=>[],'pie'=>[]];

        $branchRatings = [];

        $grouped = collect($ratings)->groupBy('name');

        $data = $grouped->toArray();

        $result = [];
        
        foreach($data as $branch => $surveys){ 
            
            $surveys = collect($surveys)->groupBy('title')->toArray();
             
            foreach ($surveys as $k => $v) {  
                 $sum = collect($v)->sum('numberOfResponses');
                 $sumScore = collect($v)->sum('totalScore');
                 $averageScore = ($sum>0)?($sumScore/$sum):0;

                 $result[] =  [
                        "values"=> [round($averageScore,2)],
                        "text"=> $branch.''."( {$k} )",
                        //"backgroundColor"=> '#FF7965',
                        //"detached"=>true
                    ];
            }

        }

        //PIE CHART
        $chart['pie'][] = [
            'id' => str_random(6),
            'height' => 600,
            'width' => '100%',
            'data' => [
                'type' => 'pie',
                "title"=> [
                    "fontColor"=> "#8e99a9",
                    "text"=> 'Branch Survey Averages',
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
                    "text"=> "",
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
                        "text"=> '%t\n%npv% ( %v average score )',
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
                    "text"=> 'Branch Survey Averages',
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
                    "text"=> "%t [ %v average score ]",
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

    return $chart;
    }

    public function getBranchSurveyAverages(array $request, array $branches){

        $ratings = \App\Rating::select('surveys.title', 'branches.name' , 'responses.name as responseName', 'raters.score', DB::raw('COUNT(ratings.response_id) as numberOfResponses'), DB::raw('( COUNT(ratings.response_id)*raters.score) as totalScore') )
                        ->leftjoin('surveys', 'ratings.survey_id', '=', 'surveys.id')
                        ->leftjoin('branches', 'ratings.branch_id', '=', 'branches.id')
                        ->leftjoin('responses', 'ratings.response_id', '=', 'responses.id')
                        ->leftjoin('raters', 'ratings.response_id', '=', 'raters.response_id')
                        ->whereIn('branches.id', $branches);
                        //->get();

        if(collect($request)->get('branchId')){
            $ratings = $ratings->where('ratings.branch_id', collect($request)->get('branchId'));
        }
        
        if(collect($request)->get('surveyId')){
            $ratings = $ratings->where('ratings.survey_id', collect($request)->get('surveyId'));
        }

        if(collect($request)->get('from') && collect($request)->get('to')){
            $ratings = $ratings->whereBetween(
                                'ratings.created_at', 
                                [
                                    $this->getDateTimeDate( $request['from'])->format('Y-m-d H:i:s'), 
                                    $this->getDateTimeDate( $request['to'])->format('Y-m-d H:i:s')
                                ]
                            );
        }

        $ratings = $ratings->groupBy('surveys.title','branches.name', DB::raw('responseName'), 'raters.score' )
                            ->get();
        
        $grouped = collect($ratings)->groupBy('title');

        $data = $grouped->toArray();

        $result = collect([]);

        foreach($data as $key => $value){
            $groupBranch = collect($value)->groupBy('name');

            $branches = $groupBranch->toArray();
            foreach ($branches as $k => $v) {
                $averageScore = round(( collect($v)->sum('totalScore')/collect($v)->sum('numberOfResponses') ),2);
                
                $image = '';
                $rater = \App\Rater::where('score', (int)round($averageScore,2,PHP_ROUND_HALF_UP))->first();
                if($rater) $image = \App\Image::find($rater->image_id);

                $result->push(['survey'=>$key,'branch'=>$k,'averageScore'=>$averageScore,'image'=> ($image)?$image->src:'']);
            }
        }

        return $result->all();
    }

    protected function getDateTimeDate($period, $format = 'Y-m-d H:i:s'){
        return new \DateTime( date( $format, strtotime( $period ) ) );
    }

}