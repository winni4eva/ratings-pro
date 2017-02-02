<?php
namespace App\Domain\Repositories\Question;

use App\Question;

class QuestionRepo implements QuestionRepoInterface
{
    protected $model;

    public function __construct(Question $question)
    {
        $this->model = $question;
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