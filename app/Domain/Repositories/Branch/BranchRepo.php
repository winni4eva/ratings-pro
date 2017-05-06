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
                        //->whereIn('ratings.branch_id', $branches)
                        //->groupBy('surveys.title','branches.name','raters.score','r.sum','r.total')
                        ->groupBy('surveys.title','branches.name', DB::raw('responseName'), 'raters.score' )
                        ->get();

        $branchRatings = [];

        $grouped = collect($ratings)->groupBy('name');

        $data = $grouped->toArray();
        $allSurveys = \App\Survey::pluck('id','title')->all();
        $allBranches = \App\Branch::whereIn('branches.id', $branches)->pluck('name')->all();

        $allSurveys = collect($allSurveys)->transform(function ($item, $key) {
            return 0;
        });
        
        foreach ($allBranches as $key => $value) {
            if( !(collect($branchRatings)->pluck("text")->search($value) > -1) )
                $branchRatings[] = ["text" => $value, "values" => $allSurveys->all() ];
        }

        
        foreach($data as $branch => $surveys){  
            // if( !(collect($branchRatings)->pluck("text")->search($branch) > -1) )
            //     $branchRatings[] = ["text" => $branch, "values" => $allSurveys->all() ];
            
            $surveys = collect($surveys)->groupBy('title')->toArray();

            foreach ($surveys as $k => $v) {  
                 $sum = collect($v)->sum('numberOfResponses');
                 $sumScore = collect($v)->sum('totalScore');
                 $averageScore = ($sum>0)?($sumScore/$sum):0;
                 $branchRatings[ collect( $branchRatings )->pluck("text")->search($branch) ]["values"][$k] = round($averageScore,2);

            }

        }

        
        collect($branchRatings)->each(function($item,$key)use(&$branchRatings){

            $data = collect([]);
            foreach(collect($item)->get('values') as $v => $i){
                $data->push([$v,$i]);
            }
            $branchRatings[ collect( $branchRatings )->pluck("text")->search( collect($item)->get('text') ) ]["values"] = $data->all();
        });
        
        $chart[] = [
            'id' => str_random(6),
            'height' => 600,
            'width' => '100%',
            'data' => [
                'type' => 'bar3d',
                'title' => [
                    "text"=> "Surveys & Average Scores",
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
                        ->whereIn('branches.id', $branches)
                        ->groupBy('surveys.title','branches.name', DB::raw('responseName'), 'raters.score' )
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

}