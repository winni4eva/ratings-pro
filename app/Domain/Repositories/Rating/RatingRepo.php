<?php
namespace App\Domain\Repositories\Rating;

use App\Rating;
use DB;

class RatingRepo implements RatingRepoInterface
{
    protected $model;

    public function __construct(Rating $rating)
    {
        $this->model = $rating;
    }

    /**
     * save ratings
     *
     * @param array $request
     * @return mixed
     */
    public function save($request)
    {
        foreach($request as $rating) {
            $this->model->create($rating);
        }
    }

    public function ratingsRawDataReport($request, $branches){ 

        $ratings = $this->model->select('surveys.title', 'branches.name' , 'responses.name as responseName', 'raters.score', DB::raw('COUNT(ratings.response_id) as numberOfResponses'), DB::raw('( COUNT(ratings.response_id)*raters.score) as totalScore') )
                        ->leftjoin('surveys', 'ratings.survey_id', '=', 'surveys.id')
                        ->leftjoin('branches', 'ratings.branch_id', '=', 'branches.id')
                        ->leftjoin('responses', 'ratings.response_id', '=', 'responses.id')
                        ->leftjoin('raters', 'ratings.response_id', '=', 'raters.response_id')
                        //->leftJoin(DB::raw('(SELECT SUM(score) AS sum, COUNT(*) as total FROM raters) as r'),'ratings.response_id', '=', 'raters.response_id')
                        //->leftJoin(DB::raw('(SELECT COUNT(*) as totalResponses FROM rat) as r'),'ratings.response_id', '=', 'raters.response_id')
                        //->whereIn('ratings.branch_id', $branches)
                        //->groupBy('surveys.title','branches.name','raters.score','r.sum','r.total')
                        ->groupBy('surveys.title','branches.name', DB::raw('responseName'), 'raters.score' )
                        ->orderBy('raters.score','desc');
                        //->get();

        if(collect($request)->get('branchId')){
            $ratings = $ratings->where('ratings.branch_id', collect($request)->get('branchId'));
        }elseif(collect($request)->get('surveyId')){
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

        $ratings = $ratings->get();

        $grouped = collect($ratings)->groupBy('name');

        $data = $grouped->toArray();

        $result = collect([]);

        foreach($data as $key => $value){
            
            $bSurveys = collect($value)->groupBy('title')->toArray();
            foreach ($bSurveys as $k => $v) {

                $sum = collect($v)->sum('numberOfResponses');
                $sumScore = collect($v)->sum('totalScore');
                $averageScore = ($sum>0)?($sumScore/$sum):0;

                foreach ($v as $q => $i) {

                    $i = collect($i);
                    $percentage = ($sum>0)? (($i->get('numberOfResponses')/$sum)*100) : 0;
                    $decimal = $percentage/100;

                    $result->push([
                        'survey'=>$i->get('title'),
                        'branch'=>$i->get('name'),
                        'responseName'=>$i->get('responseName'),
                        'score'=>$i->get('score'),
                        'numberOfResponses'=>$i->get('numberOfResponses'),
                        'totalScore'=> round($i->get('totalScore'),2),
                        'percentageScore'=>round($percentage,2).' %',
                        'decimalScore'=>round($decimal,2),
                        'averageScore'=>round($averageScore,2)
                    ]);

                }

            }

        }

        return $result->all();

    }

    protected function getDateTimeDate($period, $format = 'Y-m-d H:i:s'){
        return new \DateTime( date( $format, strtotime( $period ) ) );
    }

    public function getRatingrawDataReport(array $request, array $branches){

        $branchRatings = \App\Branch::with(['ratings'=>function($q){
            $q->with(
                'survey',
                'previousResponse',
                'question',
                'branch',
                'response.rater.image'
            );
        }])->whereIn('id', $branches)->get();

        $ratings = collect(collect($branchRatings->pluck('ratings'))->get(0));
          
        // $ratings = $this->model->with(
        //             [
        //                 'survey',
        //                 'previousResponse',
        //                 'question',
        //                 'branch',
        //                 'response.rater.image'
        //             ]);
        
        if(collect($request)->get('branchId')){
            $ratings = $ratings->where('branch_id', collect($request)->get('branchId'))->all();
        }elseif(collect($request)->get('surveyId')){
            $ratings = $ratings->where('survey_id', collect($request)->get('surveyId'))->all();
        }

        if(collect($request)->get('from') && collect($request)->get('to')){
            // $ratings = $ratings->whereBetween(
            //                     'created_at', 
            //                     [
            //                         $this->getDateTimeDate( $request['from'])->format('Y-m-d H:i:s'), 
            //                         $this->getDateTimeDate( $request['to'])->format('Y-m-d H:i:s')
            //                     ]
            //                 );
        }

        return $ratings;            
    }

    public function getRatingsReport($request, $branches){

        $ratings = $this->model->select('surveys.title', 'branches.name' , 'responses.name as responseName', 'raters.score', DB::raw('COUNT(ratings.response_id) as numberOfResponses'), DB::raw('( COUNT(ratings.response_id)*raters.score) as totalScore') )
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
        $allBranches = \App\Branch::pluck('name')->all();

        $allSurveys = collect($allSurveys)->transform(function ($item, $key) {
            return 0;
        });
        
        foreach ($allBranches as $key => $value) {
            if( !(collect($branchRatings)->pluck("text")->search($value) > -1) )
                $branchRatings[] = ["text" => $value, "values" => $allSurveys->all() ];
        }

        
        foreach($data as $branch => $surveys){  
            if( !(collect($branchRatings)->pluck("text")->search($branch) > -1) )
                $branchRatings[] = ["text" => $branch, "values" => $allSurveys->all() ];
            
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
        //logger($branchRatings);
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

}