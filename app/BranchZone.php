<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Zone;
use App\Branch;

class BranchZone extends Model
{

    protected $fillable = ['zone_id','branch_id'];

    public function zone(){
        return $this->belongsTo(Zone::class);
    }

    public function branch(){
        return $this->belongsTo(Branch::class);
    }

}
