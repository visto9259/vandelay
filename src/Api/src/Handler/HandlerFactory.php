<?php

declare(strict_types=1);

namespace Api\Handler;

use Chorus\Service\ChorusService;
use Laminas\ServiceManager\Factory\FactoryInterface;
use Psr\Container\ContainerInterface;

class HandlerFactory implements FactoryInterface
{
    /**
     * @inheritDoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, ?array $options = null)
    {
        return new $requestedName(
            $container->get(ChorusService::class),
        );
    }
}
