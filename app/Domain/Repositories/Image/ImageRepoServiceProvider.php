<?php
namespace App\Domain\Repositories\Image;

use Illuminate\Support\ServiceProvider;

class ImageRepoServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(ImageRepoInterface::class, ImageRepo::class);
    }
}