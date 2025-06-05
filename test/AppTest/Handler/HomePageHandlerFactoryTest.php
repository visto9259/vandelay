<?php

declare(strict_types=1);

namespace AppTest\Handler;

use App\Handler\HomePageHandler;
use App\Handler\HomePageHandlerFactory;
use AppTest\InMemoryContainer;
use Chorus\Options\ChorusOptions;
use Mezzio\Template\TemplateRendererInterface;
use PHPUnit\Framework\TestCase;

final class HomePageHandlerFactoryTest extends TestCase
{
    public function testFactory(): void
    {
        $container = new InMemoryContainer();
        $container->setService(ChorusOptions::class, $this->createMock(ChorusOptions::class));
        $container->setService(TemplateRendererInterface::class, $this->createMock(TemplateRendererInterface::class));

        $factory  = new HomePageHandlerFactory();
        $homePage = $factory($container);

        self::assertInstanceOf(HomePageHandler::class, $homePage);
    }
}
