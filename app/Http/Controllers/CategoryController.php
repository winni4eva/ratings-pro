<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Services\Category\CategoryService;
use App\Domain\Services\User\UserService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class CategoryController extends Controller
{
    use AuthenticatesUsers;

    protected $catService;

    protected $userService;

    public function __construct(CategoryService $catService, UserService $userService){
        $this->catService = $catService;
        $this->userService = $userService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$categories = $this->userService->getUserCategories($this->guard()->user()->id);

        //$categoryList = collect(collect(collect($categories)->pluck('branches')[0])->pluck('categories'))->get(0);

        //$categories = collect(collect($categories)->pluck('branches')[0]);

        $categories = $this->catService->getCategories([],[]);
        
        return response()->json(compact('categories'),200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->catService->saveCategory($request->all());

        return response()->json(['message' => 'Category saved successfully...'],200);
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
