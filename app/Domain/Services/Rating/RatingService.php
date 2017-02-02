<?php
namespace App\Domain\Services\Rating;

use App\Domain\Repositories\Rating\RatingRepoInterface;

class RatingService
{
    
    protected $ratingRepo;

    public function __construct(RatingRepoInterface $ratingRepo)
    {
        $this->ratingRepo = $ratingRepo;
    }

    /**
     * Save Responses
     *
     * @param array $request
     * @return mixed
     */
    public function saveRatings(array $request)
    {
        return $this->ratingRepo->save($request);
    }

    /**
     * Get Responses
     *
     * @param array $paginate
     * @return mixed
     */
    public function getResponses(array $paginate)
    {
        return $this->responseRepo->get($paginate);
    }

}