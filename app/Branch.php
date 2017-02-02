<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Category;
use App\Survey;
use App\Rating;
use App\BranchSurvey;

class Branch extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'name',
    ];

    public function user(){
        return $this->belongsToMany(User::class,'branch_user')->withTimestamps();
    }

    public function categories(){
        return $this->hasMany(Category::class);
    }

    public function surveys(){
        return $this->belongsToMany(Survey::class, 'branch_surveys');
    }

    public function ratings(){
        return $this->hasMany(Rating::class);
    }

    public function surveyCountRelation() {

            // return $this->belongsToMany(Survey::class, 'branch_surveys')
            //             ->selectRaw('branch_id, count(*) as count')
            //             ->groupBy('branch_id');

            return $this->belongsToMany(Survey::class,'branch_surveys')
                        ->selectRaw('branch_id, survey_id, count(surveys.id) as aggregate')
                        ->groupBy('branch_id','survey_id');

    }
}
