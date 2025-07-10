<?php

declare(strict_types=1);

namespace Api\Handler;

use DateTime;
use DateTimeInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final readonly class ManifestHandler extends AbstractHandler
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        return new JsonResponse([
            'status'      => 2000,
            'requestTime' => (new DateTime())->format(DateTimeInterface::ATOM),
            'data'        => [
                'callback_url' => $this->chorusService->getChorusOptions()->getCallbackUrl(),
            ],
        ]);
    }
}
