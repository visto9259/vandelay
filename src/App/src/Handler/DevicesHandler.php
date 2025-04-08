<?php

declare(strict_types=1);

namespace App\Handler;

use Chorus\Entities\Device;
use Chorus\Entities\DeviceBase;
use Chorus\Entities\Group;
use Laminas\Diactoros\Response\HtmlResponse;
use Psr\Cache\InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class DevicesHandler extends AbstractHandler
{
    /**
     * @throws InvalidArgumentException
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        /** @var array<Group> $groups */
        $groups = $this->chorusService->getGroupService()->getGroups();

        /** @var array<DeviceBase> $devices */
        $devices = [];

        foreach ($groups as $group) {
            $a = $this->chorusService->getGroupService()->getDevicesByGroupId($group->getId());
            $devices = [...$a];
        }
        $a = array_map(function ($device) {
            return $this->chorusService->getDeviceService()->getDeviceInfo($device->getId());
        }, $devices);
        return new HtmlResponse($this->template->render('app::devices-page', [
            'devices' => $a,
        ]));
    }
}
