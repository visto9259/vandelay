<?php

declare(strict_types=1);

return [
    \Mezzio\Cors\Configuration\ConfigurationInterface::CONFIGURATION_IDENTIFIER => [
        'allowed_origins' => [
            \Mezzio\Cors\Configuration\ConfigurationInterface::ANY_ORIGIN,
        ],
        'allowed_headers' => [
            'Accept', 'Content-Type',
        ],
    ]
];
