<?php
namespace App\Domain\Repositories\Rating;

use App\Rating;

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

    public function getRatingsReport($request){
        //$result = $this->model->with([
                                        //'response' => function($q){
                                            //$q->select('id','name');
                                                //->groupBy('name');
                                        //},
                                        //'previousResponse' => function($q){
                                            //$q->select('id','name');
                                              //->groupBy('name');
                                        //}
                                    //])
                    //->groupBy('name')
                    //->get(['response.name']);

        //$result = $this->model->leftjoin('branches', 'ratings.branch_id', '=', 'branches.id')
                    //->leftjoin('questions', 'ratings.question_id', '=', 'questions.id')
                    //->leftjoin('responses', 'ratings.response_id', '=', 'responses.id')
                    // ->leftjoin('responses', 'ratings.previous_response_id', '=', 'responses.id')
                    // ->select(
                    //             [ 
                    //                 '*'
                    //                 //'questions.question', 
                    //                 //'responses.name', 
                    //                 //\DB::raw('COUNT( responses.name ) as numberOfResponses')
                    //             ]
                    //         )
                    //->groupBy('responses.name')
                    //->select(array('issues.*', DB::raw('COUNT( DISTINCT(responses.name) ) as numberOfResponses')))
                    //->get();

        //logger($result);
        return [];
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
        
        if(collect($request)->get('from') && collect($request)->get('to')){
            $ratings = $ratings->whereBetween(
                                'created_at', 
                                [
                                    $this->getDateTimeDate( $request['from'])->format('Y-m-d H:i:s'), 
                                    $this->getDateTimeDate( $request['to'])->format('Y-m-d H:i:s')
                                ]
                            );
        }

        logger( $this->getDateTimeDate( $request['from'])->format('Y-m-d H:i:s') );

        return $ratings->get();            
    }

}