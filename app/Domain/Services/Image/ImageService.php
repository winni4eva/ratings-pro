<?php
namespace App\Domain\Services\Image;

use App\Domain\Repositories\Image\ImageRepoInterface;

class ImageService
{
    protected $imageRepo;

    public function __construct(ImageRepoInterface $imageRepo)
    {
        $this->imageRepo = $imageRepo;
    }

    /**
     * Save Image
     *
     * @param string $src
     * @return mixed
     */
    public function saveImage($src)
    {
        return $this->imageRepo->save($src);
    }

    /**
     * Get Images
     *
     * @return mixed
     */
    public function getImages()
    {
        return $this->imageRepo->get();
    }

    /**
     * Remove Image
     *
     * @return mixed
     */
    public function removeImage($id)
    {
        return $this->imageRepo->remove($id);
    }

}