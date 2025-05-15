<?php

declare(strict_types=1);

namespace Api\Handler;

use DateTime;
use DateTimeInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

use function file_exists;
use function unlink;

readonly class EventsClearHandler implements RequestHandlerInterface
{
    public function __construct(
        private string $eventsFile,
    ) {
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        if (file_exists($this->eventsFile)) {
            unlink($this->eventsFile);
        }
        return new JsonResponse([
            'statusCode'  => 20000,
            'requestTime' => (new DateTime())->format(DateTimeInterface::ATOM),
            'data'        => [],
        ]);
    }
}
