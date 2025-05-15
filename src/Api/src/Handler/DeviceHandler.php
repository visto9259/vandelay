<?php

declare(strict_types=1);

namespace Api\Handler;

use Api\Handler\AbstractHandler;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class DeviceHandler extends AbstractHandler
{
    /**
     * @inheritDoc
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $deviceId = $request->getAttribute('deviceId');
        $device   = $this->chorusService->getDeviceService()->getDeviceInfo($deviceId);
        return new JsonResponse($device->toArray());
    }
}
