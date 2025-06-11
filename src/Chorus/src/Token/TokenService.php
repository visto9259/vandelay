<?php

declare(strict_types=1);

namespace Chorus\Token;

use Chorus\Options\ChorusOptions;
use DateMalformedIntervalStringException;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Cache\InvalidArgumentException;
use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Contracts\Cache\ItemInterface;

use function json_decode;

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
        $cache = new FilesystemAdapter(
            'ChorusToken',
            3500,
            __DIR__ . '/../../../../data/cache'
        );
        /** @var string|null $token */
        $token = $cache->get('token', function (ItemInterface $item) {
            $newToken = $this->authenticate();
            $item->expiresAfter($newToken->getExpiresIn() - 100);
            return $newToken->getToken();
        });
        return $token;
    }

    /**
     * @throws DateMalformedIntervalStringException
     * @throws Exception
     * @throws GuzzleException
     */
    private function authenticate(): ?Token
    {
        $body     = [
            'grant_type'    => 'client_credentials',
            'client_id'     => $this->options->getClientId(),
            'client_secret' => $this->options->getClientSecret(),
            'scope'         => $this->options->getScope(),
        ];
        $client   = new Client();
        $response = $client->post($this->options->getTokenUrl(), ['form_params' => $body]);
        $data     = $response->getBody()->getContents();
        /** @var array<> $tokenData */
        $tokenData = json_decode($data, true);
        return new Token($tokenData['access_token'], $tokenData['expires_in']);
    }
}
