<?php
namespace App\Domain\Services\Question;

use App\Domain\Repositories\Question\QuestionRepoInterface;
use App\Domain\Services\User\UserService;

class QuestionService
{
    
    protected $questionRepo;

    protected $userService;

    public function __construct(QuestionRepoInterface $questionRepo, UserService $userService)
    {
        $this->questionRepo = $questionRepo;
        $this->userService = $userService;
    }

    /**
     * Save survey
     *
     * @param array $request
     * @return mixed
     */
    public function saveQuestion(array $request)
    {
        return $this->questionRepo->save($request);
    }

    /**
     * Get surveys
     *
     * @param int $id
     * @return mixed
     */
    public function getQuestions($id)
    {
        return $this->userService->getUserQuestions($id);
    }

}