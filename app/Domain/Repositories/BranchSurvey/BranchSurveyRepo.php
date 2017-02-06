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
        
        $survey = \DB::table('surveys')->where('id',$request['survey_id'])->first();
        
        $branchSurveys = $this->model->where('branch_id', $request['branch_id'])->get();
        
        $updated = false;
        foreach ($branchSurveys as $bSurvey) {

            $survey2 = \DB::table('surveys')->where('id', $bSurvey->survey_id)->first();

            if( ($request['branch_id'] == $bSurvey->branch_id) && ($survey->category_id == $survey2->category_id) ){
                
                //update branch survey
                $this->model->where('branch_id', $request['branch_id'])
                ->where('survey_id', $bSurvey->survey_id)
                ->update(
                    [
                        'branch_id' => $request['branch_id'], 
                        'survey_id' => $request['survey_id'] 
                    ]
                );
                
                $updated = true;
    
            }
        }

        if(!$updated)
            return $this->model->updateOrCreate($request, $request);
        return true;
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