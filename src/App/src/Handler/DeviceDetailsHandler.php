<?php

declare(strict_types=1);

namespace App\Handler;

use App\Handler\AbstractHandler;
use Laminas\Diactoros\Response\HtmlResponse;
use Psr\Cache\InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class DeviceDetailsHandler extends AbstractHandler
{

    /**
     * @inheritDoc
     * @throws InvalidArgumentException
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $deviceId = $request->getAttribute('deviceId');
        $device = $this->chorusService->getDeviceService()->getDeviceInfo($deviceId);
        return new HtmlResponse($this->template->render('app::device-details', [
            'device' => $device,
        ]));
    }
}
