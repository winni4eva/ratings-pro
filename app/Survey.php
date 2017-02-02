<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Question;
use App\Category;
use App\Branch;
use App\BranchSurvey;
use App\Rating;

class Survey extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'category_id', 'title', 'active'
    ];

    public function branches(){
        //return $this->belongsTo(Branch::class);
        return $this->belongsToMany(Branch::class, 'branch_surveys');
    }

    public function questions(){
        return $this->hasMany(Question::class, 'survey_id');
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function ratings(){
        return $this->hasMany(Rating::class, 'survey_id');
    }
}
