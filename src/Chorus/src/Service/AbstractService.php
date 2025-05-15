<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Options\ChorusOptions;
use Chorus\Token\TokenService;
use Exception;
use Psr\Cache\InvalidArgumentException;

use function count;
use function curl_close;
use function curl_error;
use function curl_exec;
use function curl_init;
use function curl_setopt;
use function explode;
use function json_decode;

use const CURLOPT_HEADER;
use const CURLOPT_HTTPHEADER;
use const CURLOPT_RETURNTRANSFER;
use const CURLOPT_URL;

class AbstractService
{
    public function __construct(
        private readonly ChorusOptions $options,
        private readonly TokenService $tokenService,
    ) {
    }

    /**
     * @throws InvalidArgumentException
     * @throws Exception
     */
    protected function getRequest(string $url, array $queryParams = [], array &$responseHeaders = []): array
    {
        $token = $this->tokenService->getBearerToken();
        if (null === $token) {
            return [];
        }
        $headers = [
            'Authorization: Bearer ' . $token,
            // 'Content-Type: application/x-www-form-urlencoded',
        ];
        $ch = curl_init();
        if (! $ch) {
            throw new Exception('Cannot create curl handle');
        }
        $url .= count($queryParams) ? '?' . http_build_query($queryParams) : '';
        curl_setopt($ch, CURLOPT_URL, $this->options->getBaseUrl() . $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        $response = curl_exec($ch);
        if (false === $response) {
            $error = curl_error($ch);
            throw new Exception($error);
        }
        [$header, $body] = explode("\r\n\r\n", $response, 2);

        $responseHeaders = [];
        foreach (explode("\r\n", $header) as $headerItem) {
            $a = explode(': ', $headerItem, 2);
            if (count($a) === 2) {
                $responseHeaders[$a[0]] = $a[1];
            }
        }
        curl_close($ch);
        return json_decode($body, true);
    }
}
