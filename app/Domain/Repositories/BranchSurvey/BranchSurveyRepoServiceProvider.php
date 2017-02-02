<?php
namespace App\Domain\Repositories\BranchSurvey;

use Illuminate\Support\ServiceProvider;

class BranchSurveyRepoServiceProvider extends ServiceProvider
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
        $this->app->bind(BranchSurveyRepoInterface::class, BranchSurveyRepo::class);
    }
}