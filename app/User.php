<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Branch;
use App\Category;
use App\BranchUser;
use Tymon\JWTAuth\Contracts\JWTSubject as AuthenticatableUserContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Authenticatable implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract, AuthenticatableUserContract
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'company', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function branches(){
        return $this->belongsToMany(Branch::class,'branch_user')
                    ->withTimestamps()
                    ->withPivot('admin');
    }

    public function branch(){
        return $this->belongsToMany(Branch::class,'branch_user');
    }

    public function setFirstNameAttribute($value){

        $this->attributes['first_name'] = ucfirst( strtolower( $value ) ); 

    }

    public function setLastNameAttribute($value){

        $this->attributes['last_name'] = ucfirst( strtolower( $value ) ); 

    }

    public function setCompanyAttribute($value){

        $this->attributes['company'] = strtoupper( strtolower( $value ) ); 

    }

    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();  // Eloquent model method
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
             'user' => [ 
                'id' => $this->id,
                'email' => $this->email
             ]
        ];
    }
}
