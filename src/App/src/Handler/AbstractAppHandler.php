<?php

declare(strict_types=1);

namespace App\Handler;

use Chorus\Service\AppService;
use Mezzio\Template\TemplateRendererInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

abstract readonly class AbstractAppHandler implements RequestHandlerInterface
{

    public function __construct(
        protected TemplateRendererInterface $template,
        protected AppService                $appService,
    ) {
    }
    /**
     * @inheritDoc
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        // TODO: Implement handle() method.
    }
}
