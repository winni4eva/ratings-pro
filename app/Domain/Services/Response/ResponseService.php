<?php
namespace App\Domain\Services\Response;

use App\Domain\Repositories\Response\ResponseRepoInterface;

class ResponseService
{
    
    protected $responseRepo;

    public function __construct(ResponseRepoInterface $responseRepo)
    {
        $this->responseRepo = $responseRepo;
    }

    /**
     * Save Responses
     *
     * @param array $request
     * @return mixed
     */
    public function saveResponse(array $request)
    {
        return $this->responseRepo->save($request);
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