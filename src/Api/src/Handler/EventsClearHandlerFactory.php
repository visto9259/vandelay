<?php

declare(strict_types=1);

namespace Api\Handler;

use Laminas\ServiceManager\Factory\FactoryInterface;
use Psr\Container\ContainerInterface;

class EventsClearHandlerFactory implements FactoryInterface
{
    /**
     * @inheritDoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, ?array $options = null): EventsClearHandler
    {
        $config = $container->get('config');
        return new EventsClearHandler($config['proxy_config']['events_file']);
    }
}
