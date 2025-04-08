<?php

declare(strict_types=1);

namespace Chorus\Options;

use Laminas\ServiceManager\Factory\FactoryInterface;
use Psr\Container\ContainerInterface;

class ChorusOptionsFactory implements FactoryInterface
{

    /**
     * @inheritDoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, ?array $options = null): ChorusOptions
    {
        $config = $container->get('config');
        return new ChorusOptions($config['chorus_api']);
    }
}
