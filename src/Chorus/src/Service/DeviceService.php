<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Entities\Device;
use Chorus\Options\ChorusOptions;
use Chorus\Token\TokenService;
use Exception;
use Psr\Cache\InvalidArgumentException;

class DeviceService extends AbstractService
{
    /**
     * @throws InvalidArgumentException
     */
    public function getDeviceInfo(string $deviceId): Device
    {
        $response = $this->getRequest('/api/v1/devices/' . $deviceId);
        return new Device($response['data']);
    }

    public function getDeviceTelemetry(string $deviceId): Device
    {
        $response = $this->getRequest('/api/v1/devices/' . $deviceId . '/telemetry');
        return new Device($response['data']);
    }
}
