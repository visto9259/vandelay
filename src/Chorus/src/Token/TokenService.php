<?php

declare(strict_types=1);

namespace Chorus\Token;

use Chorus\Options\ChorusOptions;
use DateMalformedIntervalStringException;
use DateMalformedStringException;
use Exception;
use Psr\Cache\InvalidArgumentException;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\Cache\CacheItem;
use Symfony\Contracts\Cache\ItemInterface;

class TokenService
{
    public function __construct(
        private readonly ChorusOptions $options
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
        /*
        if (null !== $token) {
            $cachedToken = json_decode($cachedItem, true);

            $token = new Token($cachedToken['access_token'], $cachedToken['expires_in'], $cachedToken['expires_at']);
            if (!$token->isExpired()) {
                return $token->getToken();
            }
        }
        $token = $this->authenticate();
        if (null !== $token) {
            $item = new CacheItem();
            $item->set($token->serialize());
            $item->expiresAfter($token->getExpiresIn());
            $cache->save($item);
            return $token->getToken();
        }
        */
    }

    /**
     * @throws DateMalformedIntervalStringException
     * @throws Exception
     */
    private function authenticate(): ?Token
    {
        $basicAuthentication = base64_encode($this->options->getClientId() . ':' . $this->options->getClientSecret());
        $body = ['grant_type' => 'client_credentials'];
        $headers = [
            'Authorization: Basic ' . $basicAuthentication,
           // 'Content-Type: application/x-www-form-urlencoded',
        ];
        $ch = curl_init();
        if (!$ch) {
            throw new Exception('Cannot create curl handle');
        }
        curl_setopt($ch, CURLOPT_URL, $this->options->getBaseUrl() . '/api/v1/token');
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
