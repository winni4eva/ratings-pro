<?php
namespace App\Domain\Services\BranchSurvey;

use App\Domain\Repositories\BranchSurvey\BranchSurveyRepoInterface;

class BranchSurveyService
{
    
    protected $branchSurveyRepo;

    public function __construct(BranchSurveyRepoInterface $branchSurveyRepo)
    {
        $this->branchSurveyRepo = $branchSurveyRepo;
    }

    /**
     * Save branch survey
     *
     * @param array $request
     * @return mixed
     */
    public function saveBranchSurvey(array $request)
    {
        return $this->branchSurveyRepo->save($request);
    }

    /**
     * Remove branch survey
     *
     * @param array $request
     * @return mixed
     */
    public function removeBranchSurvey(array $request)
    {
        return $this->branchSurveyRepo->remove($request);
    }

}