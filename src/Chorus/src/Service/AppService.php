<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Entities\Application;
use Chorus\Entities\ApplicationVersion;
use Chorus\Entities\Installation;
use Chorus\Options\ChorusOptions;
use Chorus\Token\TokenService;
use Exception;
use Psr\Cache\InvalidArgumentException;

class AppService extends AbstractService
{
    /**
     * @throws InvalidArgumentException
     * @throws Exception
     * @return array<Application>
     */
    public function getApps(): array
    {
        $response = $this->getRequest('/api/v1/applications');
        $apps = [];
        foreach ($response['data'] as $app) {
            $apps[] = new Application($app);
        }
        return $apps;
    }

    /**
     * @return array<ApplicationVersion>
     * @throws InvalidArgumentException
     */
    public function getAppVersions(string $appId): array
    {
        $response = $this->getRequest('/api/v1/applications/' . $appId . '/versions');
        return array_map(function ($version) {
            return new ApplicationVersion($version);
        }, $response['data']);
    }

    public function getAppInstallations(string $appId): array
    {
        $response = $this->getRequest('/api/v1/applications/' . $appId . '/installations');
        return array_map(function ($installation) {
            return new Installation($installation);
        }, $response['data']);
    }
}
