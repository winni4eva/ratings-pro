<?php
namespace App\Domain\Repositories\Response;

interface ResponseRepoInterface
{
    /**
     * Save new response
     *
     * @param array $request
     * @return mixed
     */
    public function save($request);

    /**
     * Get responses
     *
     * @param array $paginate
     * @return mixed
     */
    public function get($paginate);

}