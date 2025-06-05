<?php

declare(strict_types=1);

namespace Api\Handler;

use DateTime;
use DateTimeInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class ControlsHandler extends AbstractHandler
{
    /**
     * @inheritDoc
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $requestTime = (new DateTime())->format(DateTimeInterface::ATOM);
        if ($request->getMethod() === 'GET') {
            $appId          = $request->getAttribute('appId');
            $installationId = $request->getAttribute('installationId');
            $queryParams    = $request->getQueryParams();
            $data           = $this->chorusService->getControlService()->getControls(
                $appId,
                $installationId,
                $queryParams
            );
            foreach ($data as $index => $item) {
                $details                 = $this->chorusService->getControlService()->getControlDetails(
                    $appId,
                    $installationId,
                    $item['id']
                );
                $data[$index]['details'] = $details;
            }

            return new JsonResponse([
                'statusCode'  => 20000,
                'requestTime' => $requestTime,
                'data'        => $data,
            ], 200);
        }
        return new JsonResponse([
            'error' => 'not implemented',
        ], 405);
    }
}
