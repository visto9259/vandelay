<?php

declare(strict_types=1);

namespace Chorus\Entities;

class InstallationConfiguration
{
    protected ?string $trialE;
    protected ?string $trialS;
    protected ?string $type;
    protected ?string $enrollmentLastUpdate;
    protected ?string $hesAccessLastUpdate;
    protected ?string $hesState;
    protected ?string $state;

    public function __construct(array $data)
    {
        $this->setTrialE($data['trial_e'] ?? null);
        $this->setTrialS($data['trial_s'] ?? null);
        $this->setType($data['type'] ?? null);
        $this->setEnrollmentLastUpdate($data['enrollmentLastUpdate'] ?? null);
        $this->setHesAccessLastUpdate($data['hesAccessLastUpdate'] ?? null);
        $this->setHesState($data['hesState'] ?? null);
        $this->setState($data['state'] ?? null);
    }

    public function getTrialE(): ?string
    {
        return $this->trialE;
    }

    public function setTrialE(?string $trialE = null): self
    {
        $this->trialE = $trialE;
        return $this;
    }

    public function getTrialS(): string
    {
        return $this->trialS;
    }

    public function setTrialS(?string $trialS = null): self
    {
        $this->trialS = $trialS;
        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(?string $type = null): self
    {
        $this->type = $type;
        return $this;
    }

    public function getEnrollmentLastUpdate(): string
    {
        return $this->enrollmentLastUpdate;
    }

    public function setEnrollmentLastUpdate(?string $enrollmentLastUpdate = null): self
    {
        $this->enrollmentLastUpdate = $enrollmentLastUpdate;
        return $this;
    }

    public function getHesAccessLastUpdate(): string
    {
        return $this->hesAccessLastUpdate;
    }

    public function setHesAccessLastUpdate(?string $hesAccessLastUpdate = null): self
    {
        $this->hesAccessLastUpdate = $hesAccessLastUpdate;
        return $this;
    }

    public function getHesState(): string
    {
        return $this->hesState;
    }

    public function setHesState(?string $hesState = null): self
    {
        $this->hesState = $hesState;
        return $this;
    }

    public function getState(): string
    {
        return $this->state;
    }

    public function setState(?string $state = null): self
    {
        $this->state = $state;
        return $this;
    }
}
