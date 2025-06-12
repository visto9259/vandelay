<?php

declare(strict_types=1);

return [
    'chorus_api'   => [
        'client_id'     => getenv('CLIENT_ID') ?? '',
        'client_secret' => getenv('CLIENT_SECRET'),
        'base_url'      => getenv('BASE_URL'),
        'token_url'     => getenv('TOKEN_URL'),
        'scope'         => getenv('SCOPE'),
        'callback_url'  => getenv('CALLBACK_URL'),
    ],
    'proxy_config' => [
        'events_file' => __DIR__ . '/../../data/events/events.log',
    ],
];
