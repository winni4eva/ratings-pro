<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Branch;
use App\Survey;
use App\Image;

class Category extends Model
{

    protected $fillable = ['name','branch_id','image_id'];


    public function setNameAttribute($value){

        $this->attributes['name'] = ucfirst( strtolower( $value ) ); 

    }

    public function branch(){
        return $this->belongsTo(Branch::class);
    }

    public function surveys(){
        return $this->hasMany(Survey::class);
    }

    public function image(){
        return $this->hasOne(Image::class,'id','image_id');
    }
}
