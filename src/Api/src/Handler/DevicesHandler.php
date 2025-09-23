<?php

declare(strict_types=1);

namespace Api\Handler;

use Laminas\Diactoros\Response\JsonResponse;
use Psr\Cache\InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function date;

use const DATE_ATOM;

readonly class DevicesHandler extends AbstractHandler
{
    /**
     * @inheritDoc
     * @throws InvalidArgumentException
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $queryParams = $request->getQueryParams();
        if (! isset($queryParams['applicationId'])) {
            return new JsonResponse([
                'type'   => 'https://tools.ietf.org/html/rfc9110#section-15.5.1',
                'title'  => 'One or more validation errors occurred.',
                'status' => 400,
                'errors' => [
                    'applicationId' => [
                        'The applicationId parameter is required.',
                    ],
                ],
            ], 400);
        }
        $applicationId = $queryParams['applicationId'];
        $installations = $this->chorusService->getAppService()->getAppInstallations($applicationId, [
            'status' => 'installed',
        ]);
        //$groups  = $this->chorusService->getGroupService()->getGroups();
        $devices = [];
        /** @var array $installation */
        foreach ($installations as $installation) {
            $a                  = $this->chorusService->getDeviceService()->getDeviceInfo($installation['deviceId']);
            $a['configuration'] = $this->chorusService->getDeviceService()->getDeviceConfig($installation['deviceId']);
            $devices[]          = $a;
        }
        return new JsonResponse([
            'status'      => 2000,
            'requestTime' => date(DATE_ATOM),
            'data'        => $devices,
        ], 200);
    }
}
