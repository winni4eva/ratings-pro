<?php
namespace App\Domain\Repositories\Zone;

use App\Zone;

class ZoneRepo implements ZoneRepoInterface
{
    protected $model;

    public function __construct(Zone $zone)
    {
        $this->model = $zone;
    }

    /**
     * save zone
     *
     * @param array $request
     * @return mixed
     */
    public function save(array $request)
    {
        
        $zone = $this->model->create( collect($request)->except(['branches'])->all() );

        collect(collect($request)->get('branches'))->each(function ($item, $key)use($zone) {
            $zone->zoneBranches()->firstOrCreate( collect($item)->only('branch_id')->all() );
        });

        return true;
        
    }

    /**
     * get zone
     *
     * @param array $request
     * @return mixed
     */
    public function get(array $request)
    {
        return $this->model->get();
    }

    /**
     * find zone
     *
     * @param int $id
     * @return mixed
     */
    public function find(int $id){
        return $this->model->with('zoneBranches')->find( $id );
    }

    /**
     * remove zone
     *
     * @param array $request
     * @return mixed
     */
    public function remove(int $id){
        return $this->model->destroy($id);
    }

}