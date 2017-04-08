<?php
namespace App\Domain\Services\Zone;

use App\Domain\Repositories\Zone\ZoneRepoInterface;

class ZoneService
{
    
    protected $zoneRepo;

    public function __construct(ZoneRepoInterface $zoneRepo)
    {
        $this->zoneRepo = $zoneRepo;
    }

    /**
     * Save Zone
     *
     * @param array $request
     * @return mixed
     */
    public function saveZone(array $request)
    {
        return $this->zoneRepo->save( $request );
    }

    /**
     * Get Zones
     *
     * @param array $request
     * @return mixed
     */
    public function getZones(array $request)
    {
        return $this->zoneRepo->get( $request );
    }

    /**
     * Remove Response
     *
     * @param int $id
     * @return mixed
     */
    public function removeZone($id)
    {
        return $this->zoneRepo->remove($id);
    }

    /**
     * Find Zone
     *
     * @param int $id
     * @return mixed
     */
    public function findZone(int $id)
    {
        return $this->zoneRepo->find( $id );
    }

}