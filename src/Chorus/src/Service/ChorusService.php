<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Options\ChorusOptions;
use Chorus\Token\TokenService;

final class ChorusService
{
    protected ?AppService $appService = null;
    protected ?DeviceService $deviceService = null;
    protected ?tokenService $tokenService = null;
    protected ?groupService $groupService = null;

    public function __construct(
        private readonly ChorusOptions $options
    ) {
    }

    public function getTokenService(): TokenService
    {
        if ($this->tokenService === null) {
            $this->tokenService = new TokenService($this->options);
        }
        return $this->tokenService;
    }

    public function getDeviceService(): DeviceService
    {
        if ($this->deviceService === null) {
            $this->deviceService = new DeviceService($this->options, $this->getTokenService());
        }
        return $this->deviceService;
    }

    public function getGroupService(): GroupService
    {
        if ($this->groupService === null) {
            $this->groupService = new GroupService($this->options, $this->getTokenService());
        }
        return $this->groupService;
    }
}
