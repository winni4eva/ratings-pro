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
        
        $ratings = $this->model->select('surveys.title', 'responses.name', 'raters.score','r.sum', 'r.total', DB::raw('(raters.score*count(ratings.response_id))/r.total as average'), DB::raw('count(ratings.response_id) as count') )
                        ->leftjoin('surveys', 'ratings.survey_id', '=', 'surveys.id')
                        ->leftjoin('responses', 'ratings.response_id', '=', 'responses.id')
                        //->leftjoin('responses as previousResponse', 'ratings.previous_response_id', '=', 'responses.id')
                        ->leftjoin('raters', 'ratings.response_id', '=', 'raters.response_id')
                        ->leftJoin(DB::raw('(SELECT SUM(score) AS sum, COUNT(*) as total FROM raters) as r'),'ratings.response_id', '=', 'raters.response_id')
                        ->whereIn('ratings.branch_id', $branches)
                        ->groupBy('surveys.title','responses.name','raters.score','r.sum','r.total');

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
        //logger($ratings->get());
        return $ratings->get();

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

        $ratings = collect($branchRatings->pluck('ratings')[0]);
          
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

}