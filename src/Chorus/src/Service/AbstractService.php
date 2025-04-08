<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Options\ChorusOptions;
use Chorus\Token\TokenService;
use Exception;
use Psr\Cache\InvalidArgumentException;

class AbstractService
{
    public function __construct(
        private readonly ChorusOptions $options,
        private TokenService           $tokenService,
    ) {
    }

    /**
     * @throws InvalidArgumentException
     * @throws Exception
     */
    protected function getRequest(string $url): array
    {
        $token = $this->tokenService->getBearerToken();
        if (null === $token) {
            return [];
        }
        $headers = [
            'Authorization: Bearer ' . $token
            // 'Content-Type: application/x-www-form-urlencoded',
        ];
        $ch = curl_init();
        if (!$ch) {
            throw new Exception('Cannot create curl handle');
        }
        curl_setopt($ch, CURLOPT_URL, $this->options->getBaseUrl() . $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        if (false === $response) {
            $error = curl_error($ch);
            throw new Exception($error);
        }
        curl_close($ch);
        return json_decode($response, true);
    }
}
