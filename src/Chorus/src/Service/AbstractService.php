<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Options\ChorusOptions;
use Chorus\Token\TokenService;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Cache\InvalidArgumentException;

use function array_map;
use function implode;
use function json_decode;

class AbstractService
{
    public function __construct(
        private readonly ChorusOptions $options,
        private readonly TokenService $tokenService,
    ) {
    }

    /**
     * @throws InvalidArgumentException
     * @throws Exception|GuzzleException
     */
    protected function getRequest(string $url, array $queryParams = [], array &$responseHeaders = []): array
    {
        $token = $this->tokenService->getBearerToken();
        if (null === $token) {
            return [];
        }
        $headers  = [
            'Authorization' => 'Bearer ' . $token,
        ];
        $client   = new Client([
            'base_uri' => $this->options->getBaseUrl(),
        ]);
        $response = $client->request('GET', $url, [
            'headers' => $headers,
            'query'   => $queryParams,
        ]);

        $responseHeaders = array_map(function ($values) {
            return implode(', ', $values);
        }, $response->getHeaders());
        return json_decode($response->getBody()->getContents(), true);
    }
}
