<?php
namespace App\Domain\Repositories\ProbeQuestion;

interface ProbeQuestionRepoInterface
{
    /**
     * Save new probe question
     *
     * @param array $request
     * @return mixed
     */
    public function save($request);

    /**
     * Get probe questions
     *
     * @return mixed
     */
    public function get();

}