<?php
namespace App\Domain\Repositories\Branch;

use App\Branch;
use App\User;

class BranchRepo implements BranchRepoInterface
{
    protected $model;

    public function __construct(Branch $branch)
    {
        $this->model = $branch;
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
        if(collect($fields)->count()>0)
        {
            foreach($fields as $field) $query = $this->model->where($field, $request[$field]);

            return $query->get();
        }

        return $this->model->with('surveys')->get();
    }

    /**
     * Save branch users
     *
     * @param object $user
     * @param array $request
     * @param bool $admin
     * @return mixed
     */
    public function saveBranchUser(User $user, array $request, bool $admin = false){
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

    public function getBranchesSurveysReport($request){
        
        $branchSurveys = $this->model->with('surveyCountRelation')->get();

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