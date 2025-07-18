<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Entities\ApplicationVersion;
use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Cache\InvalidArgumentException;

class AppService extends AbstractService
{
    /**
     * @return array<array-key>
     * @throws Exception|GuzzleException
     * @throws InvalidArgumentException
     */
    public function getApps(): array
    {
        return $this->getRequest('/api/v1/applications');
    }

    /**
     * @return array<ApplicationVersion>
     * @throws InvalidArgumentException|GuzzleException
     */
    public function getAppVersions(string $appId): array
    {
        $response = $this->getRequest('/api/v1/applications/' . $appId . '/versions');
        return $response['data'] ?? [];
    }

    /**
     * @throws GuzzleException
     * @throws InvalidArgumentException
     */
    public function getAppInstallations(string $appId, array $queryParams = []): array
    {
        $headers                 = [];
        $queryParams['pageSize'] = 100;
        $response                = $this->getRequest(
            '/api/v1/applications/' . $appId . '/installations',
            $queryParams,
            $headers
        );
        return $response['data'] ?? [];
    }
}
