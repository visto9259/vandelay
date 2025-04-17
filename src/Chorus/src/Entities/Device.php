<?php

declare(strict_types=1);

namespace Chorus\Entities;

class Device extends DeviceBase
{
    protected DeviceAddress $address;
    protected string $bootDate;
    protected string $color;
    protected string $model;

    public function __construct(array $data)
    {
        parent::__construct($data);
        $this->setAddress(new DeviceAddress($data['address']));
        $this->setBootDate($data['bootDate']);
        $this->setColor($data['color']);
        $this->setModel($data['model']);
    }

    public function getAddress(): DeviceAddress
    {
        return $this->address;
    }
    public function getBootDate(): string
    {
        return $this->bootDate;
    }
    public function getColor(): string
    {
        return $this->color;
    }
    public function getModel(): string
    {
        return $this->model;
    }
    public function setAddress(DeviceAddress $address): self
    {
        $this->address = $address;
        return $this;
    }
    public function setBootDate(string $bootDate): self
    {
        $this->bootDate = $bootDate;
        return $this;
    }
    public function setColor(string $color): self
    {
        $this->color = $color;
        return $this;
    }
    public function setModel(string $model): self
    {
        $this->model = $model;
        return $this;
    }
    public function toArray(): array
    {
        $data = parent::toArray();
        return [
            ...$data,
            'bootDate' => $this->bootDate,
            'color' => $this->color,
            'model' => $this->model,
            'address' => $this->address->toArray(),
        ];
    }
}
