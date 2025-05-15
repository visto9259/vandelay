FROM composer AS composer
LABEL authors="dcbel"

COPY . /app

RUN composer install \
    --optimize-autoloader \
    --no-interaction

FROM erseco/alpine-php-webserver
COPY --chown=nginx --from=composer /app /var/www/html
ENV nginx_root_directory=/var/www/html/public

