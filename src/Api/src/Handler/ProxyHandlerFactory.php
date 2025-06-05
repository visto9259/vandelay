<?php

declare(strict_types=1);

namespace Api\Handler;

use Chorus\Options\ChorusOptions;
use Chorus\Service\ChorusService;
use Laminas\ServiceManager\Factory\FactoryInterface;
use Psr\Container\ContainerInterface;

class ProxyHandlerFactory implements FactoryInterface
{
    /**
     * @inheritDoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, ?array $options = null)
    {
        return new ProxyHandler(
            $container->get(ChorusOptions::class),
            $container->get(ChorusService::class),
        );
    }
}
