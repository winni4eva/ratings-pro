<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Rater;

class Image extends Model
{
    protected $fillable = ['src'];

    public function raters(){
        return $this->belongsTo(Rater::class,'image_id','id');
    }
}
