<?php
namespace App\Domain\Services\Branch;

use App\Domain\Repositories\Branch\BranchRepoInterface;

class BranchService
{
    protected $branchRepo;

    public function __construct(BranchRepoInterface $branchRepo)
    {
        $this->branchRepo = $branchRepo;
    }

    /**
     * Save branch
     *
     * @param array $request
     * @return mixed
     */
    public function saveBranch($request)
    {
        return $this->branchRepo->save($request);
    }

    /**
     * Get branches
     *
     * @param array $request
     * @param array $fields
     * @return mixed
     */
    public function getBranches($request = [], $fields = [])
    {
        return $this->branchRepo->get($request, $fields);
    }

    /**
     * Get branches
     *
     * @param object $user
     * @param array $request
     * @param bool $admin
     * @return mixed
     */
    public function saveBranchUser($user, $request, $admin)
    {
        return $this->branchRepo->saveBranchUser($user, $request, $admin);
    }

}