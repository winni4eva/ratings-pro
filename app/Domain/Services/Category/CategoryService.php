<?php
namespace App\Domain\Services\Category;

use App\Domain\Repositories\Category\CategoryRepoInterface;

class CategoryService
{
    protected $catRepo;

    public function __construct(CategoryRepoInterface $catRepo)
    {
        $this->catRepo = $catRepo;
    }

    /**
     * Save branch
     *
     * @param array $request
     * @return mixed
     */
    public function saveCategory(array $request)
    {
        return $this->catRepo->save($request);
    }

    /**
     * Get branches
     *
     * @param array $request
     * @param array $fields
     * @return mixed
     */
    public function getCategories(array $request,array $fields)
    {
        return $this->catRepo->get($request, $fields);
    }

}