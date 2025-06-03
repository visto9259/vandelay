<?php

declare(strict_types=1);

namespace Api\Handler;

use Api\Handler\AbstractHandler;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Cache\InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_map;
use function count;

readonly class ApplicationHandler extends AbstractHandler
{
    /**
     * @inheritDoc
     * @throws InvalidArgumentException
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $response    = $this->chorusService->getAppService()->getApps();
        $data        = $response['data'] ?? [];
        $devices     = $this->getDevices();
        $a           = [];
        if (count($data) > 0) {
            $a = array_map(function ($item) use ($devices) {
                $installations = [];
                return [
                    'id'            => $item['id'],
                    'appType'       => $item['appType'],
                    'category'      => $item['category'],
                    'versions'      => $this->chorusService->getAppService()->getAppVersions($item['id']),
                    'installations' => array_map(function ($device) use ($item) {
                        return $this->chorusService->getAppService()->getAppInstallations($item['id'], $device['id'])[0];
                    }, $devices),
                ];
            }, $data);
        }
        $response['data'] = $a;
        return new JsonResponse($response, 200);
    }

    private function getDevices(): array
    {
        $groups  = $this->chorusService->getGroupService()->getGroups();
        $devices = [];
        foreach ($groups as $group) {
            $localDevices = $this->chorusService->getGroupService()->getDevicesByGroupId($group['id']);
            $devices = [...$localDevices];
        }
        return $devices;
    }
}
