<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Lang;
use App\Domain\Services\User\UserService;
use Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';


    protected $userService;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserService $userService)
    {
        $this->middleware('guest', ['except' => 'logout']);
        $this->userService = $userService;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email','password');

        logger("I made it to login");

        //if($token = Auth::attempt($credentials))
        if ($token = $this->guard()->attempt($credentials))
            return $this->sendLoggedInResponse($request, $token);

        return $this->sendFailedLoginResponse($request);

    }

    public function logout()
    {
        $this->guard()->logout(); // pass true to blacklist forever
        //Auth::logout();
        return response()->json(['User logged out successfully'], 200);
    }

    public function sendLoggedInResponse(Request $request, $token)
    {
        $this->clearLoginAttempts($request);

        $user = $this->userService->getUserBranches($this->guard()->user()->id);

        //$user = $this->userService->getUserBranches(Auth::user()->id); 
        //$user = Auth::setToken('YourJWTAuthToken')->user();
    
        return $this->authenticated($request, $user, $token);
    }

    //protected function sendLoginResponse(Request $request, $throttles, string $token)
    protected function sendLoginResponse(Request $request, string $token)
    {
        $this->clearLoginAttempts($request);

        $user = $this->userService->getUserBranches($this->guard()->user()->id);

        //$user = $this->userService->getUserBranches(Auth::user()->id); 
        //$user = Auth::setToken('YourJWTAuthToken')->user();
        logger($token);
        return $this->authenticated($request, $user, $token);
    }

    protected function authenticated(Request $request, $user, string $token)
    {
        return response()->json(compact(['user','token']));
    }

    protected function sendFailedLoginResponse(Request $request)
    {
        logger("I failed to login");
        return response()->json([
            'message' => Lang::get('auth.failed'),
        ], 401);
    }

}
