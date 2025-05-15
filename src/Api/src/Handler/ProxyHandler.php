<?php

declare(strict_types=1);

namespace Api\Handler;

use Chorus\Options\ChorusOptions;
use Chorus\Service\ChorusService;
use Exception;
use Laminas\Diactoros\Response;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Cache\InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

use function count;
use function curl_close;
use function curl_error;
use function curl_exec;
use function curl_getinfo;
use function curl_init;
use function curl_setopt;
use function explode;
use function http_build_query;
use function json_encode;

use const CURLINFO_HTTP_CODE;
use const CURLOPT_CUSTOMREQUEST;
use const CURLOPT_HEADER;
use const CURLOPT_HTTPHEADER;
use const CURLOPT_POSTFIELDS;
use const CURLOPT_RETURNTRANSFER;
use const CURLOPT_URL;

readonly class ProxyHandler implements RequestHandlerInterface
{
    public function __construct(
        private ChorusOptions $options,
        private ChorusService $chorusService,
    ) {
    }

    /**
     * @inheritDoc
     * @throws Exception|InvalidArgumentException
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $method      = $request->getMethod();
        $url         = $request->getAttribute('url');
        $url         = '/' . $url;
        $queryParams = $request->getQueryParams();
        $token       = $this->chorusService->getTokenService()->getBearerToken();
        $headers     = [
            'Authorization: Bearer ' . $token,
        ];
        $ch          = curl_init();
        if (! $ch) {
            throw new Exception('Cannot create curl handle');
        }
        $url = $this->options->getBaseUrl() . '/api/v1' . $url;
        if (count($queryParams) > 0) {
            $url .= '?' . http_build_query($queryParams);
        }
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        if ($method === 'POST' || $method === 'PUT' || $method === 'PATCH') {
            $data = $request->getParsedBody();
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            $headers[] = 'Content-Type: application/json';
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);
        if (false === $response) {
            $error = curl_error($ch);
            return new JsonResponse([
                'error' => $error,
            ], 400);
        }
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        [$header, $body] = explode("\r\n\r\n", $response, 2);

        $headers = [];
        foreach (explode("\r\n", $header) as $headerItem) {
            $a = explode(': ', $headerItem, 2);
            if (count($a) === 2) {
                $headers[$a[0]] = $a[1];
            }
        }
        curl_close($ch);
        return new Response\TextResponse($body, $statusCode, $headers);
//        return new Response\TextResponse($body, $statusCode);
    }
}
