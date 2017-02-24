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

    public function ratingsRawDataReport($request){

        return $this->model->select('surveys.title', 'responses.name', DB::raw('avg(raters.score) as average'), DB::raw('count(ratings.response_id) as count'))
                        ->leftjoin('surveys', 'ratings.survey_id', '=', 'surveys.id')
                        ->leftjoin('responses', 'ratings.response_id', '=', 'responses.id')
                        //->leftjoin('responses as previousResponse', 'ratings.previous_response_id', '=', 'responses.id')
                        ->leftjoin('raters', 'ratings.response_id', '=', 'raters.response_id')
                        ->groupBy('surveys.title','responses.name')
                        ->get();

        //logger( $ratings->get() );

    }

    protected function getDateTimeDate($period, $format = 'Y-m-d H:i:s'){
        return new \DateTime( date( $format, strtotime( $period ) ) );
    }

    public function getRatingrawDataReport(array $request){
          
        $ratings = $this->model->with(
                    [
                        'survey',
                        'previousResponse',
                        'question',
                        'branch',
                        'response.rater.image'
                    ]);
        
        if(collect($request)->get('branchId')){
            $ratings = $ratings->where('branch_id', collect($request)->get('branchId'));
        }elseif(collect($request)->get('surveyId')){
            $ratings = $ratings->where('survey_id', collect($request)->get('surveyId'));
        }

        if(collect($request)->get('from') && collect($request)->get('to')){
            $ratings = $ratings->whereBetween(
                                'created_at', 
                                [
                                    $this->getDateTimeDate( $request['from'])->format('Y-m-d H:i:s'), 
                                    $this->getDateTimeDate( $request['to'])->format('Y-m-d H:i:s')
                                ]
                            );
        }

        return $ratings->get();            
    }

}