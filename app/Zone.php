<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\BranchZone;

class Zone extends Model
{

    protected $fillable = ['name'];

    public function setNameAttribute($value){

        $this->attributes['name'] = ucwords( strtolower( $value ) ); 

    }

    public function zoneBranches(){
        return $this->hasMany(BranchZone::class);
    }

}
