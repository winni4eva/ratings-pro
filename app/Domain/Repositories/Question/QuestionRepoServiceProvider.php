<?php
namespace App\Domain\Repositories\Question;

use Illuminate\Support\ServiceProvider;

class QuestionRepoServiceProvider extends ServiceProvider
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
        $this->app->bind(QuestionRepoInterface::class, QuestionRepo::class);
    }
}