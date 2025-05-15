<?php

declare(strict_types=1);

namespace Api\Handler;

use DateTime;
use DateTimeInterface;
use Exception;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

use function fclose;
use function fgets;
use function file_exists;
use function file_put_contents;
use function fopen;
use function json_decode;
use function json_encode;
use function mt_rand;
use function sprintf;

use const FILE_APPEND;

readonly class EventsHandler implements RequestHandlerInterface
{
    public function __construct(
        protected string $eventsFile,
    ) {
    }

    /**
     * @inheritDoc
     * @throws Exception
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        if ($request->getMethod() === 'POST') {
            $body         = json_decode($request->getBody()->getContents(), true);
            $serverParams = $request->getServerParams();
            $data         = [
                'id'        => $this->createGUID(),
                'remote'    => $serverParams['REMOTE_ADDR'] . ':' . $serverParams['REMOTE_PORT'],
                'timestamp' => (new DateTime('@' . $serverParams['REQUEST_TIME']))->format(DateTimeInterface::ATOM),
                'content'   => $body,
            ];
            file_put_contents($this->eventsFile, json_encode($data) . "\n", FILE_APPEND);
            return new JsonResponse($data, 200);
        } elseif ($request->getMethod() === 'GET') {
            if (! file_exists($this->eventsFile)) {
                $data = [
                    'statusCode'  => 20000,
                    'requestTime' => (new DateTime())->format(DateTimeInterface::ATOM),
                    'data'        => [],
                ];
            } else {
                $handle = fopen($this->eventsFile, 'r');
                if ($handle === false) {
                    return new JsonResponse([
                        'error' => 'Cannot open events file',
                    ], 500);
                }
                $data = [
                    'statusCode'  => 20000,
                    'requestTime' => (new DateTime())->format(DateTimeInterface::ATOM),
                    'data'        => [],
                ];
                while (($line = fgets($handle)) !== false) {
                    try {
                        $data['data'][] = json_decode($line, true);
                    } catch (Exception $e) {
                        return new JsonResponse([
                            'error' => 'Error reading events file',
                        ], 500);
                    }
                }
                fclose($handle);
            }
            return new JsonResponse($data, 200);
        } else {
            return new JsonResponse(null, 405);
        }
    }

    private function createGUID(): string
    {
        return sprintf(
            '%04X%04X-%04X-%04X-%04X-%04X%04X%04X',
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(16384, 20479),
            mt_rand(32768, 49151),
            mt_rand(0, 65535),
            mt_rand(0, 65535),
            mt_rand(0, 65535)
        );
    }
}
