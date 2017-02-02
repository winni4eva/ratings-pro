<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Question;
use App\Answer;

class ProbeQuestion extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'question_number', 'expected_answer', 'equality', 'next_question'
    ];

    public function question(){
        return $this->belongsTo(Question::class,'id','question_number');
    }

    public function answers(){
        //return $this->belongsTo(Answer::class,'expected_answer');
        return $this->hasMany(Answer::class,'question_id','next_question');
    }
}
