<?php

declare(strict_types=1);

namespace App\Handler;

use Chorus\Service\ChorusService;
use Laminas\ServiceManager\Factory\FactoryInterface;
use Mezzio\Template\TemplateRendererInterface;
use Psr\Container\ContainerInterface;

class HandlerFactory implements FactoryInterface
{

    /**
     * @inheritDoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, ?array $options = null)
    {
        return new $requestedName(
            $container->get(TemplateRendererInterface::class),
            $container->get(ChorusService::class),
        );
    }
}
