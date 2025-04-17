<?php

declare(strict_types=1);

namespace Api\Handler;

use Api\Handler\AbstractHandler;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class DeviceTelemetryHandler extends AbstractHandler
{

    /**
     * @inheritDoc
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        return new JsonResponse([]);
    }
}
