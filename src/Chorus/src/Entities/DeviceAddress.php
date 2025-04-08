<?php

declare(strict_types=1);

namespace Chorus\Entities;

class DeviceAddress
{
    protected string $city;
    protected string $country;
    protected string $countrySubdivision;
    protected string $freeFormAddress;
    protected string $streetName;
    protected string $streetNumber;
    protected string $zip;

    public function __construct(array $data)
    {
        $this->setCity($data['city']);
        $this->setCountry($data['country']);
        $this->setCountrySubdivision($data['countrySubdivision']);
        $this->setfreeFormAddress($data['freeformAddress']);
        $this->setStreetName($data['streetName']);
        $this->setStreetNumber($data['streetNumber']);
        $this->setZip($data['zip']);
    }

    public function getCity(): string
    {
        return $this->city;
    }
    public function setCity(string $city): self
    {
        $this->city = $city;
        return $this;
    }
    public function getCountry(): string
    {
        return $this->country;
    }
    public function setCountry(string $country): self
    {
        $this->country = $country;
        return $this;
    }
    public function getCountrySubdivision(): string
    {
        return $this->countrySubdivision;
    }
    public function setCountrySubdivision(string $countrySubdivision): self
    {
        $this->countrySubdivision = $countrySubdivision;
        return $this;
    }
    public function getFreeFormAddress(): string
    {
        return $this->freeFormAddress;
    }
    public function setFreeFormAddress(string $freeFormAddress): self
    {
        $this->freeFormAddress = $freeFormAddress;
        return $this;
    }
    public function getStreetName(): string
    {
        return $this->streetName;
    }
    public function setStreetName(string $streetName): self
    {
        $this->streetName = $streetName;
        return $this;
    }
    public function getStreetNumber(): string
    {
        return $this->streetNumber;
    }
    public function setStreetNumber(string $streetNumber): self
    {
        $this->streetNumber = $streetNumber;
        return $this;
    }
    public function getZip(): string
    {
        return $this->zip;
    }
    public function setZip(string $zip): self
    {
        $this->zip = $zip;
        return $this;
    }

}
