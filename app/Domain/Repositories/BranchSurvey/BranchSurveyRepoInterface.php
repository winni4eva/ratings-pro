<?php
namespace App\Domain\Repositories\BranchSurvey;

interface BranchSurveyRepoInterface
{
    /**
     * Save new branch survey
     *
     * @param array $request
     * @return mixed
     */
    public function save(array $request);

}