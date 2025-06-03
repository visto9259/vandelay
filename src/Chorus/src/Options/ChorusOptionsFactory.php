<?php

declare(strict_types=1);

namespace Chorus\Options;

use Laminas\ServiceManager\Exception\ServiceNotCreatedException;
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
        if (! isset($config['chorus_api'])) {
            throw new ServiceNotCreatedException('chorus_api config key is missing');
        }
        if (
            ! isset($config['chorus_api']['base_url'])
            || ! isset($config['chorus_api']['token_url'])
            || ! isset($config['chorus_api']['scope'])
            || ! isset($config['chorus_api']['client_id'])
            || ! isset($config['chorus_api']['client_secret'])
        ) {
            throw new ServiceNotCreatedException('chorus_api config is missing required keys');
        }

        if (empty($config['chorus_api']['base_url'])) {
            throw new ServiceNotCreatedException('chorus_api config base_url is empty');
        }
        if (empty($config['chorus_api']['client_id'])) {
            throw new ServiceNotCreatedException('chorus_api config client_id is empty');
        }
        if (empty($config['chorus_api']['client_secret'])) {
            throw new ServiceNotCreatedException('chorus_api config client_secret is empty');
        }
        if (empty($config['chorus_api']['scope'])) {
            throw new ServiceNotCreatedException('chorus_api config scope is empty');
        }
        if (empty($config['chorus_api']['token_url'])) {
            throw new ServiceNotCreatedException('chorus_api config token_url is empty');
        }

        return new ChorusOptions($config['chorus_api']);
    }
}
