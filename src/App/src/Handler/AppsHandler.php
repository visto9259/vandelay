<?php

declare(strict_types=1);

namespace App\Handler;

use Chorus\Service\AppService;
use Laminas\Diactoros\Response\HtmlResponse;
use Mezzio\Template\TemplateRendererInterface;
use Override;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

final readonly class AppsHandler extends AbstractAppHandler
{

    /**
     * @inheritDoc
     */
    #[Override]
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $data = $this->appService->getApps();
        return new HtmlResponse($this->template->render('app::apps-page', $data));
    }
}
