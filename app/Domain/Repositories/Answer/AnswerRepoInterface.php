<?php
namespace App\Domain\Repositories\Answer;

interface AnswerRepoInterface
{
    /**
     * Save new answer
     *
     * @param array $request
     * @return mixed
     */
    public function save($request);

    /**
     * Get answers
     *
     * @return mixed
     */
    public function get();

}