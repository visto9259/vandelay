<?php

declare(strict_types=1);

namespace Chorus\Entities;

class Installation
{
    protected string $id;
    protected string $deviceId;
    protected string $installDate;
    protected string $status;
    protected string $version;
    protected string $versionId;
    protected InstallationConfiguration $configuration;

    public function __construct(array $data)
    {
        $this->setId($data['id']);
        $this->setDeviceId($data['deviceId']);
        $this->setInstallDate($data['installDate']);
        $this->setStatus($data['status']);
        $this->setVersion($data['version']);
        $this->setVersionId($data['versionId']);
        $this->setConfiguration(new InstallationConfiguration($data['configuration']));
    }
    public function getId(): string
    {
        return $this->id;
    }
    public function getDeviceId(): string
    {
        return $this->deviceId;
    }
    public function getInstallDate(): string
    {
        return $this->installDate;
    }
    public function getStatus(): string
    {
        return $this->status;
    }
    public function getVersion(): string
    {
        return $this->version;
    }
    public function getVersionId(): string
    {
        return $this->versionId;
    }
    public function getConfiguration(): InstallationConfiguration
    {
        return $this->configuration;
    }
    public function setId(string $id): self
    {
        $this->id = $id;
        return $this;
    }
    public function setDeviceId(string $deviceId): self
    {
        $this->deviceId = $deviceId;
        return $this;
    }
    public function setInstallDate(string $installDate): self
    {
        $this->installDate = $installDate;
        return $this;
    }
    public function setStatus(string $status): self
    {
        $this->status = $status;
        return $this;
    }
    public function setVersion(string $version): self
    {
        $this->version = $version;
        return $this;
    }
    public function setVersionId(string $versionId): self
    {
        $this->versionId = $versionId;
        return $this;
    }
    public function setConfiguration(InstallationConfiguration $configuration): self
    {
        $this->configuration = $configuration;
        return $this;
    }
}
