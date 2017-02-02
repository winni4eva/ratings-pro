<?php
namespace App\Domain\Services\Answer;

use App\Domain\Repositories\Answer\AnswerRepoInterface;
use App\Domain\Services\User\UserService;

class AnswerService
{
    
    protected $answerRepo;

    protected $userService;

    public function __construct(AnswerRepoInterface $answerRepo, UserService $userService)
    {
        $this->answerRepo = $answerRepo;
        $this->userService = $userService;
    }

    /**
     * Save survey
     *
     * @param array $request
     * @return mixed
     */
    public function saveAnswer(array $request)
    {
        return $this->answerRepo->save($request);
    }

    /**
     * Get surveys
     *
     * @param int $id
     * @return mixed
     */
    public function getAnswers($id)
    {
        return $this->userService->getUserAnswers($id);
    }

}