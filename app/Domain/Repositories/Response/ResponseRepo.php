<?php
namespace App\Domain\Repositories\Response;

use App\Response;

class ResponseRepo implements ResponseRepoInterface
{
    protected $model;

    public function __construct(Response $response)
    {
        $this->model = $response;
    }

    /**
     * save response
     *
     * @param array $request
     * @return mixed
     */
    public function save($request)
    {

        if(collect($request)->get('rater')==0){
            return $this->model->create( collect($request)->only(['name','rater'])->all() );
        }elseif(collect($request)->get('rater')==1){
            $response = $this->model->create( collect( $request)->only(['name','rater'])->all() );
            return $response->rater()->create( collect( $request)->only(['image_id','score'])->all() );
        }
        
        return true;
    }

    /**
     * get all responses
     *
     * @param array $paginate
     * @return mixed
     */
    public function get($paginate)
    {
        //$skip = $paginate['currentPage'] * $paginate['itemsPerPage'];
        //$take = $paginate['itemsPerPage'];

        //return $this->model->with('images')->skip($skip)->take($take)->paginate();
        //return $this->model->with('images')->paginate($take);
        return $this->model->with('rater.image')->get();
    }

}