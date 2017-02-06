<?php
namespace App\Domain\Repositories\Branch;

use App\User;

interface BranchRepoInterface
{
    /**
     * Save new branch
     *
     * @param array $request
     * @return mixed
     */
    public function save(array $request);

    /**
     * Get branches
     *
     * @param array $request
     * @param array $fields
     * @return mixed
     */
    public function get(array $request, array $fields = []);

    /**
     * Save branch users
     *
     * @param object $user
     * @param array $request
     * @param bool $admin
     * @return mixed
     */
    public function saveBranchUser(User $user, array $request, $admin);

}