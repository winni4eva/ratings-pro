<?php
namespace App\Domain\Repositories\Rating;

use Illuminate\Support\ServiceProvider;

class RatingRepoServiceProvider extends ServiceProvider
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
        $this->app->bind(RatingRepoInterface::class, RatingRepo::class);
    }
}