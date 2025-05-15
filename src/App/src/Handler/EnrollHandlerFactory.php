<?php

declare(strict_types=1);

namespace App\Handler;

use Chorus\Service\ChorusService;
use Laminas\ServiceManager\Factory\FactoryInterface;
use Mezzio\Template\TemplateRendererInterface;
use Psr\Container\ContainerInterface;

class EnrollHandlerFactory implements FactoryInterface
{

    /**
     * @inheritDoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, ?array $options = null): EnrollHandler
    {
        return new EnrollHandler(
            $container->get(TemplateRendererInterface::class),
            $container->get(ChorusService::class)
        );
    }
}
