<?php
namespace App\Domain\Repositories\ProbeQuestion;

use Illuminate\Support\ServiceProvider;

class ProbeQuestionRepoServiceProvider extends ServiceProvider
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
        $this->app->bind(ProbeQuestionRepoInterface::class, ProbeQuestionRepo::class);
    }
}