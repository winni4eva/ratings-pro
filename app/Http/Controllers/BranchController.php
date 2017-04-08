<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Services\Branch\BranchService;
use App\Domain\Services\User\UserService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class BranchController extends Controller
{
    use AuthenticatesUsers;

    protected $branchService;

    protected $userService;

    public function __construct(BranchService $branchService, UserService $userService){
        $old = ini_set('memory_limit', '8192M'); 
        $this->branchService = $branchService;
        $this->userService = $userService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        logger($request);

       //$branches = $this->userService->getUserBranches($this->guard()->user()->id);

       //$branchlist = collect($branches->pluck('branches'))->get(0);

       $branches = $this->branchService->getBranches( $request->all() );

       //logger($branches);

       return response()->json(compact('branches'),200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $user = $this->guard()->user();

        $this->branchService->saveBranchUser(
            $user,
            [
                'name' => $request->get('name'),
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email
            ],
            true
        );
        return response()->json(['success' => 'Branch saved successfully.'],200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return response()->json([],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return response()->json([],200);
    }
}
