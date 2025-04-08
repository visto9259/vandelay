<?php

declare(strict_types=1);

namespace Chorus\Token;

use DateInterval;
use DateMalformedIntervalStringException;
use DateMalformedStringException;
use DateTime;

class Token
{
    private string $token;
    private int $expiresIn;
    private string $expiresAt;

    /**
     * @throws DateMalformedIntervalStringException
     */
    public function __construct(string $token, int $expiresIn, ?string $expiresAt = null)
    {
        $this->token = $token;
        $this->expiresIn = $expiresIn;
        if (null === $expiresAt) {
            $now = new DateTime();
            $now->add(new DateInterval('PT' . $expiresIn . 'S'));
            $this->expiresAt = $now->format(DATE_ATOM);
        } else {
            $this->expiresAt = $expiresAt;
        }
    }

    public function getToken(): string
    {
        return $this->token;
    }

    public function getExpiresIn(): int
    {
        return $this->expiresIn;
    }

    /**
     * @throws DateMalformedStringException
     */
    public function isExpired(): bool
    {
        $expiresAt = new DateTime($this->expiresAt);
        $interval = $expiresAt->diff(new DateTime());
        return $interval->invert === 1;
    }

    public function serialize(): string
    {
        return json_encode([
            'token' => $this->token,
            'expires_at' => $this->expiresAt,
            'expires_in' => $this->expiresIn,
        ]);
    }

    public function unserialize(string $data): void
    {
        $array = json_decode($data, true);
        $this->token = $array['token'];
        $this->expiresIn = $array['expires_at'];
        $this->expiresAt = $array['expires_at'];
    }
}
