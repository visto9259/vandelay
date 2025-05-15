<?php

declare(strict_types=1);

namespace Chorus\Service;

use Chorus\Options\ChorusOptions;
use Chorus\Token\TokenService;
use Exception;
use Psr\Cache\InvalidArgumentException;

use function curl_close;
use function curl_error;
use function curl_exec;
use function curl_getinfo;
use function curl_init;
use function curl_setopt;
use function explode;
use function json_decode;
use function substr;

use const CURLINFO_HEADER_SIZE;
use const CURLOPT_HEADER;
use const CURLOPT_HTTPHEADER;
use const CURLOPT_RETURNTRANSFER;
use const CURLOPT_URL;

final class ChorusService
{
    protected ?AppService $appService       = null;
    protected ?DeviceService $deviceService = null;
    protected ?TokenService $tokenService   = null;
    protected ?GroupService $groupService   = null;
    protected ?ControlService $controlService = null;

    public function __construct(
        private readonly ChorusOptions $options
    ) {
    }

    public function getAppService(): AppService
    {
        if (! $this->appService) {
            $this->appService = new AppService($this->options, $this->getTokenService());
        }
        return $this->appService;
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

    public function getControlService(): ControlService
    {
        if ($this->controlService === null) {
            $this->controlService = new ControlService($this->options, $this->getTokenService());
        }
        return $this->controlService;
    }

    /**
     * @throws InvalidArgumentException
     * @throws Exception
     */
    public function proxyRequest(string $method, string $url, array $queryParams = [], $body = null): string
    {
        $token   = $this->getTokenService()->getBearerToken();
        $headers = [
            'Authorization: Bearer ' . $token,
        ];
        $ch      = curl_init();
        if (! $ch) {
            throw new Exception('Cannot create curl handle');
        }
        $url = $this->options->getBaseUrl() . '/api/v1' . $url;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        $response = curl_exec($ch);
        if (false === $response) {
            $error = curl_error($ch);
            throw new Exception($error);
        }
        $headerSize         = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $header             = substr($response, 0, $headerSize);
        $response           = substr($response, $headerSize);
        $info               = curl_getinfo($ch);
        $headers            = explode("\r\n", $header);
        curl_close($ch);
        return $response;
    }

    /**
     * @throws InvalidArgumentException
     * @throws Exception
     */
    protected function getRequest(string $url): array
    {
        $token = $this->tokenService->getBearerToken();
        if (null === $token) {
            return [];
        }
        $headers = [
            'Authorization: Bearer ' . $token,
            // 'Content-Type: application/x-www-form-urlencoded',
        ];
        $ch = curl_init();
        if (! $ch) {
            throw new Exception('Cannot create curl handle');
        }
        curl_setopt($ch, CURLOPT_URL, $this->options->getBaseUrl() . $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        if (false === $response) {
            $error = curl_error($ch);
            throw new Exception($error);
        }
        curl_close($ch);
        return json_decode($response, true);
    }
}
