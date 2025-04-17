<?php

declare(strict_types=1);

namespace Api\Handler;

use Chorus\Entities\Group;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Cache\InvalidArgumentException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

readonly class GroupHandler extends AbstractHandler
{

    /**
     * Only GET is implemented
     */

    /**
     * @inheritDoc
     * @throws InvalidArgumentException
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        if ($request->getMethod() === 'GET') {
            $groups = $this->chorusService->getGroupService()->getGroups();
            $data = array_map(function ($item) {
                /** @var Group $item */
                return $item->toArray();
            }, $groups);
            return new JsonResponse($data, 200);
        } else {
            return new JsonResponse(null, 405);
        }
    }
}
