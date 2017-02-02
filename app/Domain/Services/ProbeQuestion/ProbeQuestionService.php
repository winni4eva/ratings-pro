<?php
namespace App\Domain\Services\ProbeQuestion;

use App\Domain\Repositories\ProbeQuestion\ProbeQuestionRepoInterface;

class ProbeQuestionService
{
    
    protected $probQtnRepo;

    public function __construct(ProbeQuestionRepoInterface $probQtnRepo)
    {
        $this->probQtnRepo = $probQtnRepo;
    }

    /**
     * Save Responses
     *
     * @param array $request
     * @return mixed
     */
    public function saveProbeQuestion(array $request)
    {
        return $this->probQtnRepo->save($request);
    }

    /**
     * Get Responses
     *
     * @param array $paginate
     * @return mixed
     */
    public function getProbeQuestions(array $paginate)
    {
        return $this->probQtnRepo->get($paginate);
    }

}