<?php

declare(strict_types=1);

use Mezzio\Application;
use Mezzio\MiddlewareFactory;
use Psr\Container\ContainerInterface;

/**
 * FastRoute route configuration
 *
 * @see https://github.com/nikic/FastRoute
 *
 * Setup routes with a single request method:
 *
 * $app->get('/', App\Handler\HomePageHandler::class, 'home');
 * $app->post('/album', App\Handler\AlbumCreateHandler::class, 'album.create');
 * $app->put('/album/{id:\d+}', App\Handler\AlbumUpdateHandler::class, 'album.put');
 * $app->patch('/album/{id:\d+}', App\Handler\AlbumUpdateHandler::class, 'album.patch');
 * $app->delete('/album/{id:\d+}', App\Handler\AlbumDeleteHandler::class, 'album.delete');
 *
 * Or with multiple request methods:
 *
 * $app->route('/contact', App\Handler\ContactHandler::class, ['GET', 'POST', ...], 'contact');
 *
 * Or handling all request methods:
 *
 * $app->route('/contact', App\Handler\ContactHandler::class)->setName('contact');
 *
 * or:
 *
 * $app->route(
 *     '/contact',
 *     App\Handler\ContactHandler::class,
 *     Mezzio\Router\Route::HTTP_METHOD_ANY,
 *     'contact'
 * );
 */

return static function (Application $app, MiddlewareFactory $factory, ContainerInterface $container): void {
    $app->get('/', App\Handler\HomePageHandler::class, 'home');
    $app->get('/devices[/{id}]', App\Handler\HomePageHandler::class, 'home.devices');
    $app->get('/applications[/{id}]', App\Handler\HomePageHandler::class, 'home.applications');
    $app->get('/monitor', App\Handler\HomePageHandler::class, 'home.monitor');
    $app->get('/enroll[/complete/{installationId}]', App\Handler\HomePageHandler::class, 'home.enroll');
    $app->route('/api/v1/{url:[a-zA-Z0-9\/\-]+}', [
        \Mezzio\Helper\BodyParams\BodyParamsMiddleware::class,
        \Api\Handler\ProxyHandler::class,
    ])->setName('api.proxy');
    $app->get('/api/applications', \Api\Handler\ApplicationHandler::class, 'api.applications');
    $app->get('/api/devices', Api\Handler\DevicesHandler::class)->setName('api.devices');
    $app->route('/api/events', \Api\Handler\EventsHandler::class)->setName('events');
    $app->post('/api/events/clear', \Api\Handler\EventsClearHandler::class, 'events.clear');
    $app->route('/api/controls/{appId}/installations/{installationId}', \Api\Handler\ControlsHandler::class)->setName('api.controls');
    $app->get('/api/manifest', \Api\Handler\ManifestHandler::class)->setName('api.manifest');
};
