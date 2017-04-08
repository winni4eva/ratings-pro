<?php
namespace App\Domain\Repositories\Zone;

use Illuminate\Support\ServiceProvider;

class ZoneRepoServiceProvider extends ServiceProvider
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
        $this->app->bind(ZoneRepoInterface::class, ZoneRepo::class);
    }
}