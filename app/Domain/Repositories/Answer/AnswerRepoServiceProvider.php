<?php
namespace App\Domain\Repositories\Answer;

use Illuminate\Support\ServiceProvider;

class AnswerRepoServiceProvider extends ServiceProvider
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
        $this->app->bind(AnswerRepoInterface::class, AnswerRepo::class);
    }
}