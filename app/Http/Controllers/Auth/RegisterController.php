<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Domain\Services\User\UserService;
use App\Domain\Services\Branch\BranchService;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * User service.
     *
     * @var object
     */
    protected $userService;

    /**
     * Branch service.
     *
     * @var object
     */
    protected $branchService;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserService $userService, BranchService $branchService)
    {
        $this->middleware('guest');
        $this->userService = $userService;
        $this->branchService = $branchService;
    }

    /**
     * Signup app users
     *
     * @param App\Http\Requests\AuthRequest $request
     * @return mixed
     */
    public function signup(Request $request){

        $inputs = $request->all();

        $foundUser = $this->userService->getUser($inputs, ['email']);

        if(!$foundUser->isEmpty()) return response()->json(['error'=>'A user with the email '. $foundUser[0]->email. ' already exists'], 403);

        $user = $this->userService->saveUser($inputs);

        $branch = $this->branchService->saveBranchUser($user, $inputs, true);

        return response()->json(compact(['user','branch']),200);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }
}
