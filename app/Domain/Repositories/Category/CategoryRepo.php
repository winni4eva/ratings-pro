<?php
namespace App\Domain\Repositories\Category;

use App\Category;

class CategoryRepo implements CategoryRepoInterface
{
    protected $model;

    public function __construct(Category $category)
    {
        $this->model = $category;
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
     * get user data
     *
     * @param array $request
     * @return mixed
     */
    public function get(array $request, array $fields = [])
    {

        if(collect($fields)->count()>0)
        {
            foreach($fields as $field) $query = $this->model->where($field, $request[$field]);

            return $query->get();
        }

        return $this->model->with('image')->get();
    
    }

}