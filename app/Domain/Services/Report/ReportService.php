<?php
namespace App\Domain\Services\Report;

use App\Domain\Repositories\Rating\RatingRepoInterface;
use App\Domain\Repositories\Branch\BranchRepoInterface;
use App\Domain\Repositories\Survey\SurveyRepoInterface;

class ReportService
{
    
    protected $ratingRepo;

    protected $branchRepo;

    protected $surveyRepo;

    public function __construct(
                                RatingRepoInterface $ratingRepo,
                                SurveyRepoInterface $surveyRepo, 
                                BranchRepoInterface $branchRepo
                                )
    {
        $this->ratingRepo = $ratingRepo;
        $this->branchRepo = $branchRepo;
        $this->surveyRepo = $surveyRepo;
    }

    /**
     * Get Responses
     *
     * @param array $paginate
     * @return mixed
     */
    public function getRatingsRawDataReport(array $request, array $branches)
    {
        return $this->ratingRepo->ratingsRawDataReport( $request, $branches );
    }

    public function getOverview(array $request, array $branches){
        return $this->branchRepo->getBranchesSurveysReport( $request, $branches );
    }

    public function getSurveys(array $request, array $branches){
        return $this->surveyRepo->getSurveyRatingsReport( $request, $branches );
    }

    public function getRawDataOverview(array $request, array $branches){
        return $this->ratingRepo->getRatingrawDataReport( $request, $branches );
    }

}