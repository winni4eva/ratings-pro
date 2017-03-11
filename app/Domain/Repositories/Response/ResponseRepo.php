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
        logger(collect($request)->get('responseId'));

        $responseId = collect($request)->get('responseId');
        if(collect($request)->get('rater')==0){
            if($responseId > 0){
                return $this->model->where('id', $responseId)->update( collect($request)->only(['name','rater'])->all() );
            }else{
                return $this->model->create( collect($request)->only(['name','rater'])->all() );
            }
        }elseif(collect($request)->get('rater')==1){
            if($responseId > 0){
                $this->model->where('id', $responseId)->update( collect( $request)->only(['name','rater'])->all() );
                $response = $this->model->find($responseId);
                return $response->rater()->update( collect( $request)->only(['image_id','score'])->all() );
            }else{
                $response = $this->model->create( collect( $request)->only(['name','rater'])->all() );
                return $response->rater()->create( collect( $request)->only(['image_id','score'])->all() );
            }
        }
        
        //return true;
    }

    /**
     * get all responses
     *
     * @param array $paginate
     * @return mixed
     */
    public function get($request)
    {
        if(collect($request)->get('responseId')>0){
            return $this->model->with('rater.image')
                        ->where('id', collect($request)->get('responseId') )
                        ->get(); 
        }
        //$skip = $paginate['currentPage'] * $paginate['itemsPerPage'];
        //$take = $paginate['itemsPerPage'];

        //return $this->model->with('images')->skip($skip)->take($take)->paginate();
        //return $this->model->with('images')->paginate($take);
        return $this->model->with('rater.image')->get();
    }

    /**
     * remove response
     *
     * @param int $id
     * @return mixed
     */
    public function remove($id)
    {
        return $this->model->destroy($id);
    }

}