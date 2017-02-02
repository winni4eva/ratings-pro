<?php
namespace App\Domain\Repositories\Response;

use Illuminate\Support\ServiceProvider;

class ResponseRepoServiceProvider extends ServiceProvider
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
        $this->app->bind(ResponseRepoInterface::class, ResponseRepo::class);
    }
}