<?php
namespace App\Domain\Services\User;

use App\Domain\Repositories\User\UserRepoInterface;

class UserService
{
    protected $userRepo;

    public function __construct(UserRepoInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    /**
     * Find user
     *
     * @param integer $id
     * @return mixed
     */
    public function findUser($id)
    {
        return $this->userRepo->find($id);
    }

    /**
     * Get user
     *
     * @param array $request
     * @param array $fields
     * @return mixed
     */
    public function getUser($request, $fields)
    {
        return $this->userRepo->get($request, $fields);
    }

    /**
     * Save user
     *
     * @param array $request
     * @return mixed
     */
    public function saveUser($request)
    {
        return $this->userRepo->save($request);
    }

    /**
     * Remove user
     *
     * @param integer $id
     * @return mixed
     */
    public function removeUser($id)
    {
        return $this->userRepo->remove($id);
    }

    /**
     * Get user branches
     *
    * @param int $id
     * @return mixed
     */
    public function getUserBranches($id)
    {
        return $this->userRepo->userBranches($id);
    }

    /**
     * Get user categories
     *
    * @param int $id
     * @return mixed
     */
    public function getUserCategories($id)
    {
        return $this->userRepo->userCategories($id);
    }

    /**
     * Get user surveys
     *
    * @param int $id
     * @return mixed
     */
    public function getUserSurveys($id)
    {
        return $this->userRepo->userSurveys($id);
    }

    /**
     * Get user surveys
     *
    * @param int $id
     * @return mixed
     */
    public function getUserSurveyReport($id)
    {
        return $this->userRepo->userSurveyReport($id);
    }

}