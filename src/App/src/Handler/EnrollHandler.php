<?php

declare(strict_types=1);

namespace App\Handler;

use App\Form\Enroll;
use Chorus\Service\ChorusService;
use Laminas\Diactoros\Response\HtmlResponse;
use Laminas\Diactoros\Response\JsonResponse;
use Mezzio\Template\TemplateRendererInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

use function preg_match;

readonly class EnrollHandler implements RequestHandlerInterface
{
    public function __construct(
        private TemplateRendererInterface $template,
        private ChorusService $chorusService,
    ) {
    }

    /**
     * @inheritDoc
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        if ($request->getMethod() === 'GET') {
            $queryParams    = $request->getQueryParams();
            $installationId = $queryParams['installationid'] ?? $queryParams['installationId'] ?? null;
            if ($installationId === null) {
                return new HtmlResponse($this->template->render('error::error', [
                    'status' => 400,
                    'reason' => '"installationId is required"',
                ]));
            }
            if ($this->validateInstallationID($installationId)) {
                $form = new Enroll();
                $form->setData([
                    'installationId' => $installationId,
                ]);
                return new HtmlResponse($this->template->render('app::enroll', [
                    'enrollForm' => $form,
                    'layout'     => 'layout::nonav',
                ]));
            } else {
                return new HtmlResponse($this->template->render('error::error', [
                    'status' => 400,
                    'reason' => 'installationId is invalid',
                ]));
            }
        } elseif ($request->getMethod() === 'POST') {
            $data = $request->getParsedBody();
            $form = new Enroll();
            $form->setData($data);
            if (! $form->isValid()) {
                return new HtmlResponse($this->template->render('app::enroll', [
                    'enrollForm' => new Enroll(),
                    'layout'     => 'layout::nonav',
                ]));
            }
            $data = $form->getData();
            return new HtmlResponse($this->template->render('app::enroll-post', [
                'data' => $data,
            ]));
        } else {
            return new JsonResponse(['error' => 'Invalid request method'], 405);
        }
    }

    private function validateInstallationID(string $installationId): bool
    {
        $matches = [];
        preg_match("/[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}/", $installationId, $matches);
        if (empty($matches)) {
            return false;
        } else {
            return $installationId === $matches[0];
        }
    }
}
