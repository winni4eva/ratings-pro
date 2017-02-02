<?php
namespace App\Domain\Repositories\User;

interface UserRepoInterface
{
    /**
     * Save new user
     *
     * @param array $request
     * @return mixed
     */
    public function save(array $request);

    /**
     * Get users
     *
     * @param array $request
     * @param array $fields
     * @return mixed
     */
    public function get(array $request, array $fields = []);

    /**
     * get user branches
     *
     * @param int $id
     * @return mixed
     */
    public function userBranches($id);

    /**
     * get user categories
     *
     * @param int $id
     * @return mixed
     */
    public function userCategories($id);

    /**
     * get user surveys
     *
     * @param int $id
     * @return mixed
     */
    public function userSurveys($id);

    /**
     * get user survey report
     *
     * @param int $id
     * @return mixed
     */
    public function userSurveyReport($id);

}