<?php
namespace App\Domain\Repositories\Branch;

use Illuminate\Support\ServiceProvider;

class BranchRepoServiceProvider extends ServiceProvider
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
        $this->app->bind(BranchRepoInterface::class, BranchRepo::class);
    }
}