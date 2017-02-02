<?php
namespace App\Domain\Repositories\Rating;


interface RatingRepoInterface
{

    /**
     * Get ratings
     *
     * @param array $request
     * @return mixed
     */
    public function save($request);

}