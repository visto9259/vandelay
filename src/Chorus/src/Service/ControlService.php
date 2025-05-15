<?php

declare(strict_types=1);

namespace Chorus\Service;

class ControlService extends AbstractService
{
    public function getControls(string $appId, string $installationId, array $queryParams = []): array
    {
        $response = $this->getRequest(
            "/api/v1/applications/$appId/installations/$installationId/controls", $queryParams
        );
        return $response['data'];
    }

    public function getControlDetails(string $appId, string $installationId, string $controlId): array
    {
        $response = $this->getRequest("/api/v1/applications/$appId/installations/$installationId/controls/$controlId");
        return $response['data'];
    }
}
