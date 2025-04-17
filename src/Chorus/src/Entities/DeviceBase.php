<?php

declare(strict_types=1);

namespace Chorus\Entities;

class DeviceBase
{
    protected string $id;
    protected string $serialNumber;
    protected DeviceStatus $status;

    public function __construct(array $data)
    {
        $this->setId($data['id']);
        $this->setSerialNumber($data['serialNumber']);
        $this->setStatus(new DeviceStatus($data['status']));
    }

    public function getId(): string
    {
        return $this->id;
    }
    public function getSerialNumber(): string
    {
        return $this->serialNumber;
    }
    public function getStatus(): DeviceStatus
    {
        return $this->status;
    }
    public function setId(string $id): self
    {
        $this->id = $id;
        return $this;
    }
    public function setSerialNumber(string $serialNumber): self
    {
        $this->serialNumber = $serialNumber;
        return $this;
    }
    public function setStatus(DeviceStatus $status): self
    {
        $this->status = $status;
        return $this;
    }
    public function toArray(): array
    {
        return [
            'id'           => $this->getId(),
            'serialNumber' => $this->getSerialNumber(),
            'status'       => $this->getStatus()->toArray(),
        ];
    }
}
