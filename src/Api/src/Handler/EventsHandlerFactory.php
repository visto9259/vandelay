<?php

declare(strict_types=1);

namespace Api\Handler;

use Laminas\ServiceManager\Factory\FactoryInterface;
use Psr\Container\ContainerInterface;

class EventsHandlerFactory implements FactoryInterface
{
    /**
     * @inheritDoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, ?array $options = null): EventsHandler
    {
        $config = $container->get('config');
        return new EventsHandler($config['proxy_config']['events_file']);
    }
}
