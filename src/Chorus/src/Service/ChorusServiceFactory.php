<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Options\ChorusOptions;
use Laminas\ServiceManager\Factory\FactoryInterface;
use Psr\Container\ContainerInterface;

class ChorusServiceFactory implements FactoryInterface
{
    /**
     * @inheritDoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, ?array $options = null): ChorusService
    {
        return new ChorusService(
            $container->get(ChorusOptions::class),
        );
    }
}
