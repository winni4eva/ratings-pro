<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Services\User\UserService;
use App\Domain\Services\Branch\BranchService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class UserController extends Controller
{
    use AuthenticatesUsers;

    protected $userService;

    protected $branchService;

    public function __construct(UserService $userService, BranchService $branchService){
        $this->userService = $userService;
        $this->branchService = $branchService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $resource = [];

        switch ($request->get('resource')) {
            case 'surveys':
                $surveys = $this->userService->getUserSurveys( $this->guard()->user()->id );
                
                $questionaires = collect( collect( collect($surveys)->get(0) )->get(0) )->get('surveys');

                $resource = ['surveys' => $questionaires, 'branch_id' => collect($surveys)->get(1)];
                break;
            case 'users':
                $resource = $this->userService->getUser([], []);
                break;
            default:
                $resource = $this->userService->getUser([], []);
                break;
        }
        
        return response()->json(compact('resource'),200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $this->userService->saveUser($request->all());

        //$this->branchService->saveBranchUser($user, ['branch_id' => $request->get('branch_id')], ($request->get('admin') == 1? true : false) );

        return response()->json(['success'=>'User added successfully...'],200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
