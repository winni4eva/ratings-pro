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

    public function branchCountRelation() {

        // return $this->zoneBranches()
        //             ->selectRaw('branch_id, count(*) as count')
        //             ->groupBy('branch_id');

    }

}
