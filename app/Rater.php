<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Response;
use App\Image;

class Rater extends Model
{
    protected $fillable = [ 'image_id', 'response_id', 'score' ];

    public function response(){
        return $this->belongsTo(Response::class);
    }

    public function image(){
        return $this->hasOne(Image::class,'id','image_id');
    }
}
