<?php

declare(strict_types=1);

namespace Api\Handler;

use Chorus\Service\AppService;
use Chorus\Service\ChorusService;
use Mezzio\Template\TemplateRendererInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

abstract readonly class AbstractHandler implements RequestHandlerInterface
{

    public function __construct(
        protected ChorusService $chorusService,
    ) {
    }
}
