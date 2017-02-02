<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Branch;
use App\Survey;

class BranchSurvey extends Model
{
    protected $table = 'branch_surveys';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'branch_id', 'survey_id'
    ];

    public function branch(){
        return $this->belongsTo(Branch::class,'branch_id');
    }

    public function survey(){
        return $this->belongsTo(Survey::class,'survey_id');
    }
}
