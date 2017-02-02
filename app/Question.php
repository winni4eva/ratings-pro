<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Survey;
use App\Answer;
use App\ProbeQuestion;
use App\Rating;

class Question extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'survey_id', 'question'
    ];

    public function survey(){
        return $this->belongsTo(Survey::class);
    }

    public function answers(){
        return $this->hasMany(Answer::class);
    }

    public function probeQuestions(){
        return $this->hasMany(ProbeQuestion::class,'question_number');
    }

    public function rating(){
        return $this->hasMany(Rating::class);
    }
}
