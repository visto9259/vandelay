<?php

declare(strict_types=1);

namespace AppTest\Handler;

use App\Handler\HomePageHandler;
use Chorus\Options\ChorusOptions;
use Laminas\Diactoros\Response\HtmlResponse;
use Mezzio\Template\TemplateRendererInterface;
use Override;
use PHPUnit\Framework\MockObject\Exception;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ServerRequestInterface;

final class HomePageHandlerTest extends TestCase
{
    /** @var ContainerInterface&MockObject */
    protected ContainerInterface $container;

    protected TemplateRendererInterface $renderer;
    protected ChorusOptions $chorusOptions;

    /**
     * @throws Exception
     */
    #[Override]
    protected function setUp(): void
    {
        $this->renderer      = $this->createMock(TemplateRendererInterface::class);
        $this->chorusOptions = $this->createMock(ChorusOptions::class);
    }

    /**
     * @throws Exception
     */
    public function testReturnsHtmlResponse(): void
    {
        $homePage = new HomePageHandler($this->renderer, $this->chorusOptions);
        $response = $homePage->handle(
            $this->createMock(ServerRequestInterface::class)
        );

        self::assertInstanceOf(HtmlResponse::class, $response);
    }

    /**
     * @throws Exception
     */
    public function testReturnsHtmlResponseWhenTemplateRendererProvided(): void
    {
        $renderer = $this->createMock(TemplateRendererInterface::class);
        $renderer
            ->expects($this->once())
            ->method('render')
            ->with('app::home-page', $this->isArray())
            ->willReturn('');

        $homePage = new HomePageHandler($renderer, $this->chorusOptions);

        $response = $homePage->handle(
            $this->createMock(ServerRequestInterface::class)
        );

        self::assertInstanceOf(HtmlResponse::class, $response);
    }
}
