<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Entities\DeviceBase;
use Chorus\Entities\Group;
use Psr\Cache\InvalidArgumentException;

class GroupService extends AbstractService
{
    /**
     * @throws InvalidArgumentException
     */
    public function getGroups(): array
    {
        $response = $this->getRequest('/api/v1/groups');
        return $response['data'];
        /*
        $groups = [];
        foreach ($response['data'] as $group) {
            $groups[] = new Group($group);
        }
        return $groups;
        */
    }

    public function getDevicesByGroupId(string $id): array
    {
        $response = $this->getRequest('/api/v1/groups/' . $id . '/devices');
        return $response['data'];
        /*
        $devices = [];
        foreach ($response['data'] as $device) {
            $devices[] = new DeviceBase($device);
        }
        return $devices;
        */
    }

}
