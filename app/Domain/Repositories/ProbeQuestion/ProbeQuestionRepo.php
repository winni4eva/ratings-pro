<?php
namespace App\Domain\Repositories\ProbeQuestion;

use App\ProbeQuestion;

class ProbeQuestionRepo implements ProbeQuestionRepoInterface
{
    protected $model;

    public function __construct(ProbeQuestion $probeQtn)
    {
        $this->model = $probeQtn;
    }

    /**
     * save probe question
     *
     * @param string $request
     * @return mixed
     */
    public function save($request)
    {
        return $this->model->create($request);
    }

    /**
     * get all surveys
     *
     * @return mixed
     */
    public function get()
    {
        return $this->model->get();
    }

}