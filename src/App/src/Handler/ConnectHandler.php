<?php

declare(strict_types=1);

namespace App\Handler;

use App\Forms\Connect;
use Laminas\Diactoros\Response\HtmlResponse;
use Laminas\Diactoros\Response\RedirectResponse;
use Mezzio\Helper\UrlHelper;
use Mezzio\Template\TemplateRendererInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

final class ConnectHandler implements RequestHandlerInterface
{
    public function __construct(
        private readonly TemplateRendererInterface $template,
        private readonly UrlHelper $urlHelper
    ){
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        if ($request->getMethod() === 'POST') {
            $data = $request->getParsedBody();
            $form = new Connect();
            $form->setData($data);
            if ($form->isValid()) {
                $data = $form->getData();
                return new RedirectResponse($this->urlHelper->generate('home'));
            }
        }
        return new HtmlResponse($this->template->render('app::connect-page', [
            'connectForm' => new Connect(),
        ]));
    }
}
