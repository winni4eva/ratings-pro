<?php
namespace App\Domain\Repositories\Image;

use App\Image;

class ImageRepo implements ImageRepoInterface
{
    protected $model;

    public function __construct(Image $image)
    {
        $this->model = $image;
    }

    /**
     * save image data
     *
     * @param string $src
     * @return mixed
     */
    public function save($src)
    {
        return $this->model->create([
            'src' => $src,
        ]);
    }

    /**
     * get all images
     *
     * @return mixed
     */
    public function get()
    {
        return $this->model->all();
    }

    /**
     * remove image
     *
     * @return mixed
     */
    public function remove($id)
    {
        return $this->model->destroy($id);
    }

}