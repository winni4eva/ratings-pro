<?php
namespace App\Domain\Repositories\Category;

use Illuminate\Support\ServiceProvider;

class CategoryRepoServiceProvider extends ServiceProvider
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
        $this->app->bind(CategoryRepoInterface::class, CategoryRepo::class);
    }
}