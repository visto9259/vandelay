<?php

declare(strict_types=1);

namespace Chorus\Options;

use Laminas\Stdlib\AbstractOptions;

class ChorusOptions extends AbstractOptions
{
    private string $client_id;
    private string $client_secret;
    private string $base_url;

    public function getClientId(): string
    {
        return $this->client_id;
    }

    public function setClientId(string $client_id): self
    {
        $this->client_id = $client_id;
        return $this;
    }

    public function getClientSecret(): string
    {
        return $this->client_secret;
    }

    public function setClientSecret(string $client_secret): self
    {
        $this->client_secret = $client_secret;
        return $this;
    }

    public function getBaseUrl(): string
    {
        return $this->base_url;
    }

    public function setBaseUrl(string $base_url): self
    {
        $this->base_url = $base_url;
        return $this;
    }

}
