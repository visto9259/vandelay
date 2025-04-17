<?php

declare(strict_types=1);

namespace Chorus\Token;

use Chorus\Options\ChorusOptions;
use DateMalformedIntervalStringException;
use Exception;
use Psr\Cache\InvalidArgumentException;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Contracts\Cache\ItemInterface;

readonly class TokenService
{
    public function __construct(
        private ChorusOptions $options
    ) {
    }

    /**
     * @throws InvalidArgumentException
     */
    public function getBearerToken(): ?string
    {
//        $dir = require __DIR__ . '/../../../../data/cache';
        $cache = new FilesystemAdapter(
            'ChorusToken',
            3500,
            __DIR__ . '/../../../../data/cache'
        );
        /** @var string|null $token */
        $token = $cache->get('token', function (ItemInterface $item) {
            $newToken = $this->authenticate();
            $item->expiresAfter($newToken->getExpiresIn()-100);
            return $newToken->getToken();
        });
        return $token;
    }

    /**
     * @throws DateMalformedIntervalStringException
     * @throws Exception
     */
    private function authenticate(): ?Token
    {
        $body = [
            'grant_type' => 'client_credentials',
            'client_id' => $this->options->getClientId(),
            'client_secret' => $this->options->getClientSecret(),
            'scope' => $this->options->getScope(),
        ];
        $headers = [];
        $ch = curl_init();
        if (!$ch) {
            throw new Exception('Cannot create curl handle');
        }
        curl_setopt($ch, CURLOPT_URL, $this->options->getTokenUrl());
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        if (false === $response) {
            $error = curl_error($ch);
            throw new Exception($error);
        }
        curl_close($ch);
        $response = json_decode($response, true);
        return new Token($response['access_token'], $response['expires_in']);
    }

}
