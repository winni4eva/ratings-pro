<?php
namespace App\Domain\Repositories\Survey;

use Illuminate\Support\ServiceProvider;

class SurveyRepoServiceProvider extends ServiceProvider
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
        $this->app->bind(SurveyRepoInterface::class, SurveyRepo::class);
    }
}