<?php

declare(strict_types=1);

namespace Api;

use Api\Handler\ApplicationHandler;
use Api\Handler\ControlsHandler;
use Api\Handler\DeviceHandler;
use Api\Handler\DevicesHandler;
use Api\Handler\DeviceTelemetryHandler;
use Api\Handler\GroupHandler;
use Api\Handler\HandlerFactory;
use Api\Handler\ProxyHandler;
use Api\Handler\ProxyHandlerFactory;

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
                GroupHandler::class               => HandlerFactory::class,
                DevicesHandler::class             => HandlerFactory::class,
                DeviceHandler::class              => HandlerFactory::class,
                DeviceTelemetryHandler::class     => HandlerFactory::class,
                ProxyHandler::class               => ProxyHandlerFactory::class,
                ApplicationHandler::class         => HandlerFactory::class,
                ControlsHandler::class            => HandlerFactory::class,
                Handler\EventsHandler::class      => Handler\EventsHandlerFactory::class,
                Handler\EventsClearHandler::class => Handler\EventsClearHandlerFactory::class,
                Handler\ManifestHandler::class    => HandlerFactory::class,
            ],
        ];
    }
}
