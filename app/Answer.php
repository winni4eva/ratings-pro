<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Question;
use App\ProbeQuestion;
use App\Response;

class Answer extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['question_id', 'response_id'];
    
    public function question(){
        return $this->belongsTo(Question::class);
    }

    public function probeQuestion(){
        return $this->belongsTo(ProbeQuestion::class, 'expected_answer');
    }

    public function response(){
        return $this->belongsTo(Response::class);
    }

}
