<?php
namespace App\Domain\Repositories\Zone;

interface ZoneRepoInterface
{
    /**
     * Save new zone
     *
     * @param array $request
     * @return mixed
     */
    public function save(array $request);

    /**
     * Get zones
     *
     * @param array $request
     * @return mixed
     */
    public function get(array $request);

    /**
     * find zone
     *
     * @param int $id
     * @return mixed
     */
    public function find($id);

    /**
     * Remove zone
     *
     * @param int $id
     * @return mixed
     */
    public function remove(int $id);

}