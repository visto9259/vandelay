<?php

declare(strict_types=1);

namespace Api\Handler;

use Chorus\Service\ChorusService;
use Psr\Http\Server\RequestHandlerInterface;

abstract readonly class AbstractHandler implements RequestHandlerInterface
{
    public function __construct(
        protected ChorusService $chorusService,
    ) {
    }
}
