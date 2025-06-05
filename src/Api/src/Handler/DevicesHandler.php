<?php

declare(strict_types=1);

namespace Api\Handler;

use Laminas\Diactoros\Response\JsonResponse;
use Psr\Cache\InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class DevicesHandler extends AbstractHandler
{
    /**
     * @inheritDoc
     * @throws InvalidArgumentException
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $groups  = $this->chorusService->getGroupService()->getGroups();
        $devices = [];
        foreach ($groups as $group) {
            $localDevices = $this->chorusService->getGroupService()->getDevicesByGroupId($group['id']);
            foreach ($localDevices as $index => $device) {
                $localDevices[$index]                  = $this->chorusService->getDeviceService()
                    ->getDeviceInfo($device['id']);
                $localDevices[$index]['group']         = $group;
                $localDevices[$index]['configuration'] = $this->chorusService->getDeviceService()
                    ->getDeviceConfig($device['id']);
            }
            $devices = [...$localDevices];
        }
        return new JsonResponse(['data' => $devices], 200);
    }
}
