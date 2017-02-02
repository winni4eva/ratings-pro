<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Services\Image\ImageService;

class ImageController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService){
        $this->imageService = $imageService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $images = $this->imageService->getImages();

        return response()->json(compact('images'),200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if(!$request->file('image')) 
            return response()->json(['error' => 'No file was uploaded..'],403);

        $dirSeparator = DIRECTORY_SEPARATOR;     

        $path = public_path()."{$dirSeparator}images{$dirSeparator}ratings{$dirSeparator}responses";

        if( !file_exists($path) ) mkdir($path, 0777, true);
        
        $image = $request->file('image');

        $img_path = $image->move($path, $image->getClientOriginalName());

        $imageUrl = "{$dirSeparator}images{$dirSeparator}ratings{$dirSeparator}responses{$dirSeparator}".$image->getClientOriginalName();

        $this->imageService->saveImage($imageUrl);

        return response()->json(['success'=>'Image saved successfully...'],200);
        
        //Image::make( $img_path )->resize(200, 285)->save( $img_path );//To Do Resize cover image with Intervention
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
