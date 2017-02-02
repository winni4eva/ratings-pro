<?php
namespace App\Domain\Repositories\Answer;

use App\Answer;

class AnswerRepo implements AnswerRepoInterface
{
    protected $model;

    public function __construct(Answer $answer)
    {
        $this->model = $answer;
    }

    /**
     * save survey
     *
     * @param string $request
     * @return mixed
     */
    public function save($request)
    {
        return $this->model->create($request);
    }

    /**
     * get all surveys
     *
     * @return mixed
     */
    public function get()
    {
        return $this->model->get();
    }

}