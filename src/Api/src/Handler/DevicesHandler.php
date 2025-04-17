<?php

declare(strict_types=1);

namespace Api\Handler;

use Api\Handler\AbstractHandler;
use Chorus\Entities\DeviceBase;
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
        $groups = $this->chorusService->getGroupService()->getGroups();
        $devices = [];
        foreach ($groups as $group) {
            $devices = [...$this->chorusService->getGroupService()->getDevicesByGroupId($group->getId())];
        }
        $data = array_map(function ($item) {
            return $item->toArray();
        }, $devices);
        return new JsonResponse($data, 200);
    }
}
