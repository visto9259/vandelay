<?php

declare(strict_types=1);

namespace Chorus\Entities;

class ApplicationVersion
{
    protected string $id;
    protected string $appId;
    protected string $appName;
    protected bool   $latest;
    protected string $release;
    protected string $version;
    protected string $status;

    public function __construct(array $data)
    {
        $this->setId($data['id']);
        $this->setAppId($data['appId']);
        $this->setAppName($data['appName']);
        $this->setLatest($data['latest']);
        $this->setRelease($data['release']);
        $this->setVersion($data['version']);
        $this->setStatus($data['status']);
    }

    public function getId(): string
    {
        return $this->id;
    }
    public function setId(string $id): self
    {
        $this->id = $id;
        return $this;
    }
    public function getAppId(): string
    {
        return $this->appId;
    }
    public function setAppId(string $appId): self
    {
        $this->appId = $appId;
        return $this;
    }
    public function getAppName(): string
    {
        return $this->appName;
    }
    public function setAppName(string $appName): self
    {
        $this->appName = $appName;
        return $this;
    }
    public function getLatest(): bool
    {
        return $this->latest;
    }
    public function setLatest(bool $latest): self
    {
        $this->latest = $latest;
        return $this;
    }
    public function getRelease(): string
    {
        return $this->release;
    }
    public function setRelease(string $release): self
    {
        $this->release = $release;
        return $this;
    }
    public function getVersion(): string
    {
        return $this->version;
    }
    public function setVersion(string $version): self
    {
        $this->version = $version;
    }
    public function getStatus(): string
    {
        return $this->status;
    }
    public function setStatus(string $status): self
    {
        $this->status = $status;
        return $this;
    }
}
