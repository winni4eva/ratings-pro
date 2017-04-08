<?php
namespace App\Domain\Repositories\Branch;

use App\Branch;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
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
        
        $branchSurveys = $this->model->with('surveyCountRelation')->whereIn('id', $branches)->get();

        $branches = [];
        $chart = [];
        collect($branchSurveys)->flatMap(function($branch) use(&$branches){
            $branches[] =  [ 
                        'text' => $branch->name, 
                        'values' => [collect( $branch->surveyCountRelation )->count()] 
                    ];       
        });

        $chart[] = [
            'id' => str_random(6),
            'height' => 600,
            'width' => '100%',
            'data' => [
                'type' => 'bar3d',
                'title' => [
                    "text"=> "Branches & Total Surveys",
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
                "series" => $branches
            ]
        ]; 

        return $chart;
    }

}