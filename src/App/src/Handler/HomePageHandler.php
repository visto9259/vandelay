<?php

declare(strict_types=1);

namespace App\Handler;

use Chorus\Service\AppService;
use Laminas\Diactoros\Response\HtmlResponse;
use Mezzio\Template\TemplateRendererInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

final readonly class HomePageHandler implements RequestHandlerInterface
{
    public function __construct(
        private TemplateRendererInterface $template,
        private AppService                $appService,
    ) {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $data = $this->appService->getApps();
        return new HtmlResponse($this->template->render('app::home-page', $data));
    }
}
