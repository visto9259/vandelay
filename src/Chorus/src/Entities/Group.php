<?php

declare(strict_types=1);

namespace Chorus\Entities;

class Group
{
    protected string $description;
    protected string $id;
    protected string $name;

    public function __construct(array $data)
    {
        $this->setId($data['id']);
        $this->setName($data['name']);
        $this->setDescription($data['description']);
    }

    public function getDescription(): string
    {
        return $this->description;
    }
    public function getId(): string
    {
        return $this->id;
    }
    public function getName(): string
    {
        return $this->name;
    }
    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }
    public function setId(string $id): self
    {
        $this->id = $id;
        return $this;
    }
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }
    public function toArray(): array
    {
        return [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'description' => $this->getDescription(),
        ];
    }
}
