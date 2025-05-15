<?php

declare(strict_types=1);

namespace Api\Handler;

use Api\Handler\AbstractHandler;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Cache\InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_map;
use function count;

readonly class ApplicationHandler extends AbstractHandler
{
    /**
     * @inheritDoc
     * @throws InvalidArgumentException
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $response = $this->chorusService->getAppService()->getApps();
        $data     = $response['data'] ?? [];
        $queryParams = $request->getQueryParams();
        $deviceId = $queryParams['deviceId'] ?? $queryParams['deviceid'] ?? null;
        $a        = [];
        if (count($data) > 0) {
            $a = array_map(function ($item) use ($deviceId) {
                return [
                    'id'            => $item['id'],
                    'appType'       => $item['appType'],
                    'category'      => $item['category'],
                    'versions'      => $this->chorusService->getAppService()->getAppVersions($item['id']),
                    'installations' => $this->chorusService->getAppService()->getAppInstallations(
                        $item['id'],
                        $deviceId,
                    ),
                ];
            }, $data);
        }
        $response['data'] = $a;
        return new JsonResponse($response, 200);
    }
}
