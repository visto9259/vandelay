<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Options\ChorusOptions;
use Chorus\Token\TokenService;
use Exception;
use Psr\Cache\InvalidArgumentException;

readonly class AppService
{
    public function __construct(
        private ChorusOptions $options,
        private TokenService  $tokenService,
    ) {
    }

    /**
     * @throws InvalidArgumentException
     * @throws Exception
     */
    public function getApps(): array
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
        curl_setopt($ch, CURLOPT_URL, $this->options->getBaseUrl() . '/api/v1/applications');
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        if (false === $response) {
            $error = curl_error($ch);
            throw new Exception($error);
        }
        curl_close($ch);
        $response = json_decode($response, true);

        return [
            'response' => $response,
        ];
    }

    public function getAppVersions(string $appId): array
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
        curl_setopt($ch, CURLOPT_URL, $this->options->getBaseUrl() . '/api/v1/applications/' . $appId .'/versions');
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        if (false === $response) {
            $error = curl_error($ch);
            throw new Exception($error);
        }
        curl_close($ch);
        $response = json_decode($response, true);

        return [
            'response' => $response,
        ];
    }

    public function getAppInstallations(string $appId): array
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
        curl_setopt($ch, CURLOPT_URL, $this->options->getBaseUrl() . '/api/v1/applications/' . $appId .'/installations');
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        if (false === $response) {
            $error = curl_error($ch);
            throw new Exception($error);
        }
        curl_close($ch);
        $response = json_decode($response, true);

        return [
            'response' => $response,
        ];
    }
}
