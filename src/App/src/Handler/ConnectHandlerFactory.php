<?php

declare(strict_types=1);

namespace App\Handler;

use Laminas\ServiceManager\Factory\FactoryInterface;
use Mezzio\Helper\UrlHelper;
use Mezzio\Template\TemplateRendererInterface;
use Psr\Container\ContainerInterface;

class ConnectHandlerFactory implements FactoryInterface
{

    /**
     * @inheritDoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, ?array $options = null): ConnectHandler
    {
        return new ConnectHandler(
            $container->get(TemplateRendererInterface::class),
            $container->get(UrlHelper::class),
        );
    }
}
