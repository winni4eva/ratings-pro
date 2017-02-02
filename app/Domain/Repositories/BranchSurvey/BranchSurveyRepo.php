<?php
namespace App\Domain\Repositories\BranchSurvey;

use App\BranchSurvey;

class BranchSurveyRepo implements BranchSurveyRepoInterface
{
    protected $model;

    public function __construct(BranchSurvey $branchSurvey)
    {
        $this->model = $branchSurvey;
    }

    /**
     * save branch survey
     *
     * @param array $request
     * @return mixed
     */
    public function save(array $request)
    {
        return $this->model->updateOrCreate($request, $request);
    }

    /**
     * remove branch survey
     *
     * @param array $request
     * @return mixed
     */
    public function remove(array $request)
    {
        return $this->model->where($request)->delete();
    }

}