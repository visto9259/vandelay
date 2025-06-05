<?php

declare(strict_types=1);

namespace Chorus\Token;

use Chorus\Options\ChorusOptions;
use Laminas\ServiceManager\Factory\FactoryInterface;
use Psr\Container\ContainerInterface;

class TokenServiceFactory implements FactoryInterface
{
    /**
     * @inheritDoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, ?array $options = null): TokenService
    {
        return new TokenService($container->get(ChorusOptions::class));
    }
}
