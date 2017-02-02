<?php
namespace App\Domain\Repositories\Category;

interface CategoryRepoInterface
{
    /**
     * Save new category
     *
     * @param array $request
     * @return mixed
     */
    public function save(array $request);

    /**
     * Get categories
     *
     * @param array $request
     * @param array $fields
     * @return mixed
     */
    public function get(array $request, array $fields = []);

}