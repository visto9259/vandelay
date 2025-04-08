<?php

declare(strict_types=1);

namespace App\Handler;

use Chorus\Service\AppService;
use Exception;
use Laminas\Diactoros\Response\HtmlResponse;
use Mezzio\Template\TemplateRendererInterface;
use Override;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

final readonly class AppsVersionHandler extends AbstractAppHandler
{
    /**
     * @inheritDoc
     * @throws Exception
     */
    #[Override]
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $appId = $request->getAttribute('appId');
        $data = $this->appService->getAppVersions($appId);
        return new HtmlResponse($this->template->render('app::apps-versions', $data));
    }
}
