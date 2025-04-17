<?php

declare(strict_types=1);

namespace App\Handler;

use Chorus\Options\ChorusOptions;
use Mezzio\Template\TemplateRendererInterface;
use Psr\Container\ContainerInterface;
use Psr\Http\Server\RequestHandlerInterface;

use function assert;

final class HomePageHandlerFactory
{
    public function __invoke(ContainerInterface $container): RequestHandlerInterface
    {
        return new HomePageHandler(
            $container->get(TemplateRendererInterface::class),
            $container->get(ChorusOptions::class));
    }
}
