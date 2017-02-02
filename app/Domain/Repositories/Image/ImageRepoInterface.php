<?php
namespace App\Domain\Repositories\Image;

interface ImageRepoInterface
{
    /**
     * Save new image
     *
     * @param string $src
     * @return mixed
     */
    public function save($src);

    /**
     * Get images
     *
     * @return mixed
     */
    public function get();

}