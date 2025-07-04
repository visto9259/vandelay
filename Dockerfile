FROM php:8.3-apache AS base
LABEL authors="dcbel"

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN a2enmod rewrite

COPY config /var/www/html/config
COPY src /var/www/html/src
COPY public /var/www/html/public
COPY composer.json /usr/src/vandelay
COPY composer.lock /usr/src/vandelay
COPY bin /var/www/html/bin
COPY vendor /var/www/html/vendor
RUN mkdir /var/www/html/data
RUN mkdir /var/www/html/data/events
#RUN apt-get update
#RUN apt-get install -y git zip unzip



#FROM composer AS composer
#COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
EXPOSE 80/tcp
#CMD ["composer", "serve"]

