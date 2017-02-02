<?php

namespace App;
use App\Image;
use App\Answer;
use App\ProbeQuestion;
use App\Rating;
use App\Rater;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    protected $fillable = ['name','rater'];

    public function setNameAttribute($value){

        $this->attributes['name'] = ucwords( strtolower( $value ) ); 

    }

    public function response(){
        return $this->hasMany(Answer::class);
    }

    public function probeQuestions(){
        return $this->hasMany(ProbeQuestion::class);
    }

    public function rating(){
        return $this->hasMany(Rating::class);
    }

    public function rater(){
        return $this->hasOne(Rater::class);
    }
}
