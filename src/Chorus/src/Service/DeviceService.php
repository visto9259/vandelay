<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Entities\Device;
use Psr\Cache\InvalidArgumentException;

class DeviceService extends AbstractService
{
    /**
     * @throws InvalidArgumentException
     */
    public function getDeviceInfo(string $deviceId): array
    {
        $response = $this->getRequest('/api/v1/devices/' . $deviceId);
        return $response['data'];
    }

    public function getDeviceConfig(string $deviceId): array
    {
        $response = $this->getRequest('/api/v1/devices/' . $deviceId . '/configuration');

        return $response['data'];
    }

    public function getDeviceTelemetry(string $deviceId): Device
    {
        $response = $this->getRequest('/api/v1/devices/' . $deviceId . '/telemetry');
        return new Device($response['data']);
    }
}
