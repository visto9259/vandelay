<?php

declare(strict_types=1);

namespace Chorus\Entities;

class DeviceStatus
{
    protected ?string $status     = null;
    protected ?string $updateDate = null;

    public function __construct(array $data)
    {
        $this->status     = $data['status'];
        $this->updateDate = $data['updateDate'];
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): DeviceStatus
    {
        $this->status = $status;
        return $this;
    }

    public function getUpdateDate(): ?string
    {
        return $this->updateDate;
    }

    public function setUpdateDate(?string $updateDate): DeviceStatus
    {
        $this->updateDate = $updateDate;
        return $this;
    }

    public function toArray(): array
    {
        return [
            'status'     => $this->status,
            'updateDate' => $this->updateDate,
        ];
    }
}
