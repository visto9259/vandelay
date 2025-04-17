<?php

declare(strict_types=1);

namespace Api;

use Api\Handler\DeviceHandler;
use Api\Handler\DevicesHandler;
use Api\Handler\DeviceTelemetryHandler;
use Api\Handler\GroupHandler;
use Api\Handler\HandlerFactory;

class ConfigProvider
{
    public function __invoke(): array
    {
        return [
            'dependencies' => $this->getDependencies(),
        ];
    }

    public function getDependencies(): array
    {
        return [
            'factories' => [
                GroupHandler::class => HandlerFactory::class,
                DevicesHandler::class => HandlerFactory::class,
                DeviceHandler::class => HandlerFactory::class,
                DeviceTelemetryHandler::class => HandlerFactory::class,
            ],
        ];
    }
}
