<?php
namespace App\Domain\Repositories\Survey;

use App\Survey;

class SurveyRepo implements SurveyRepoInterface
{
    protected $model;

    public function __construct(Survey $response)
    {
        $this->model = $response;
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
        return $this->model->with('category')->get();
    }

    public function getSurveyRatingsReport($request){
        
        $surveys = $this->model->with('ratings')->get();

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