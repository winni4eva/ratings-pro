<?php
namespace App\Domain\Repositories\Survey;

interface SurveyRepoInterface
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