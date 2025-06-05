<?php

declare(strict_types=1);

namespace Chorus\Entities;

class Application
{
    protected ?string $id          = null;
    protected ?string $appType     = null;
    protected ?string $category    = null;
    protected array $installations = [];
    protected array $versions      = [];

    public function __construct(array $data)
    {
        $this->setId($data['id']);
        $this->setAppType($data['appType']);
        $this->setCategory($data['category']);
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getAppType(): string
    {
        return $this->appType;
    }

    public function getCategory(): string
    {
        return $this->category;
    }

    public function setId(string $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function setAppType(string $appType): self
    {
        $this->appType = $appType;
        return $this;
    }

    public function setCategory(string $category): self
    {
        $this->category = $category;
        return $this;
    }

    public function toArray(): array
    {
        return [
            'id'       => $this->getId(),
            'appType'  => $this->getAppType(),
            'category' => $this->getCategory(),
        ];
    }
}
