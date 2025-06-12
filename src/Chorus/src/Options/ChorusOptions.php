<?php

declare(strict_types=1);

namespace Chorus\Options;

use Laminas\Stdlib\AbstractOptions;

class ChorusOptions extends AbstractOptions
{
    private string $clientId;
    private string $clientSecret;
    private string $baseUrl;
    private string $tokenUrl;
    private string $scope;
    private string $callbackUrl;

    public function getClientId(): string
    {
        return $this->clientId;
    }

    public function setClientId(string $clientId): self
    {
        $this->clientId = $clientId;
        return $this;
    }

    public function getClientSecret(): string
    {
        return $this->clientSecret;
    }

    public function setClientSecret(string $clientSecret): self
    {
        $this->clientSecret = $clientSecret;
        return $this;
    }

    public function getBaseUrl(): string
    {
        return $this->baseUrl;
    }

    public function setBaseUrl(string $baseUrl): self
    {
        $this->baseUrl = $baseUrl;
        return $this;
    }

    public function getTokenUrl(): string
    {
        return $this->tokenUrl;
    }

    public function setTokenUrl(string $tokenUrl): self
    {
        $this->tokenUrl = $tokenUrl;
        return $this;
    }

    public function getScope(): string
    {
        return $this->scope;
    }

    public function setScope(string $scope): self
    {
        $this->scope = $scope;
        return $this;
    }

    public function getCallbackUrl(): string
    {
        return $this->callbackUrl;
    }

    public function setCallbackUrl(string $callbackUrl): self
    {
        $this->callbackUrl = $callbackUrl;
        return $this;
    }
}
