<?php
namespace App\Domain\Repositories\Question;

interface QuestionRepoInterface
{
    /**
     * Save new survey
     *
     * @param array $request
     * @return mixed
     */
    public function save($request);

    /**
     * Get surveys
     *
     * @return mixed
     */
    public function get();

}