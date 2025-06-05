<?php

declare(strict_types=1);

namespace Chorus;

use Chorus\Options\ChorusOptions;
use Chorus\Options\ChorusOptionsFactory;
use Chorus\Service\AppService;
use Chorus\Service\AppServiceFactory;
use Chorus\Service\ChorusService;
use Chorus\Service\ChorusServiceFactory;
use Chorus\Service\DeviceService;
use Chorus\Service\DeviceServiceFactory;
use Chorus\Token\TokenService;
use Chorus\Token\TokenServiceFactory;

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
                ChorusOptions::class => ChorusOptionsFactory::class,
                TokenService::class  => TokenServiceFactory::class,
                AppService::class    => AppServiceFactory::class,
                DeviceService::class => DeviceServiceFactory::class,
                ChorusService::class => ChorusServiceFactory::class,
            ],
        ];
    }
}
