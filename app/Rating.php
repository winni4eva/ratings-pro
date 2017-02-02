<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Response;
use App\Question;
use App\Branch;
use App\Survey;

class Rating extends Model
{
    protected $fillable = ['question_id','response_id','branch_id','previous_response_id','survey_id'];

    public function response(){
        return $this->belongsTo(Response::class);
    }

    public function question(){
        return $this->belongsTo(Question::class);
    }

    public function branch(){
        return $this->belongsTo(Branch::class);
    }

    public function previousResponse(){
        return $this->belongsTo(Response::class, 'previous_response_id');
    }

    public function survey(){
        return $this->belongsTo(Survey::class);
    }
}
