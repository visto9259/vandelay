<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Entities\ApplicationVersion;
use Exception;
use Psr\Cache\InvalidArgumentException;

class AppService extends AbstractService
{
    /**
     * @throws InvalidArgumentException
     * @throws Exception
     * @return array<array-key>
     */
    public function getApps(): array
    {
        return $this->getRequest('/api/v1/applications');
    }

    /**
     * @return array<ApplicationVersion>
     * @throws InvalidArgumentException
     */
    public function getAppVersions(string $appId): array
    {
        $response = $this->getRequest('/api/v1/applications/' . $appId . '/versions');
        return $response['data'] ?? [];
    }

    public function getAppInstallations(string $appId, ?string $deviceId = null): array
    {
        $headers  = [];
        $queryParams = $deviceId ? ['deviceId' => $deviceId] : [];
        $response = $this->getRequest('/api/v1/applications/' . $appId . '/installations', $queryParams, $headers);
        return $response['data'] ?? [];
    }
}
