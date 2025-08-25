<?php

declare(strict_types=1);

namespace Api\Handler;

use GuzzleHttp\Exception\GuzzleException;
use Laminas\Diactoros\Response\JsonResponse;
use Override;
use Psr\Cache\InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_filter;
use function array_map;
use function array_values;

readonly class ApplicationHandler extends AbstractHandler
{
    /**
     * @inheritDoc
     * @throws InvalidArgumentException
     * @throws GuzzleException
     */
    #[Override]
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        /** @var ?string $applicationId */
        $applicationId = $request->getQueryParams()['applicationId'] ?? null;
        if ($applicationId === null) {
            return new JsonResponse([
                'type'   => 'https://tools.ietf.org/html/rfc9110#section-15.5.1',
                'title'  => 'One or more validation errors occurred.',
                'status' => 400,
                'errors' => [
                    'applicationId' => [
                        'The applicationId parameter is required.',
                    ],
                ],
            ], 400);
        }
        $response = $this->chorusService->getAppService()->getApps();
        /** @var array $applications */
        $applications     = $response['data'];
        $applications     = array_filter($applications, fn ($application) => $application['id'] === $applicationId);
        $applications     = array_values($applications);
        $a                = array_map(function (array $item) {
            $versions      = $this->chorusService->getAppService()->getAppVersions($item['id']);
            $installations = $this->chorusService->getAppService()->getAppInstallations(
                $item['id'],
                ['status' => 'installed']
            );
            return [
                ...$item,
                'id'            => $item['id'],
                'appType'       => $item['appType'],
                'category'      => $item['category'],
                'versions'      => $versions,
                'installations' => $installations,
            ];
        }, $applications);
        $response['data'] = $a;
        return new JsonResponse($response, 200);
    }

    private function getDevices(): array
    {
        $groups  = $this->chorusService->getGroupService()->getGroups();
        $devices = [];
        foreach ($groups as $group) {
            $localDevices = $this->chorusService->getGroupService()->getDevicesByGroupId($group['id']);
            $devices      = [...$localDevices];
        }
        return $devices;
    }
}
