# imagem oficial do PHP com Apache para o backend
FROM php:7.4-apache

# Copia o código PHP para o diretório padrão do Apache
COPY . /var/www/html

# Configura as permissões para o Apache
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# DocumentRoot e permissões no Apache
RUN echo "<Directory /var/www/html/> \n\
    Options Indexes FollowSymLinks \n\
    AllowOverride All \n\
    Require all granted \n\
    </Directory>" > /etc/apache2/conf-available/allow-root-access.conf && \
    a2enconf allow-root-access

# porta padrão que o Apache vai ouvir
EXPOSE 80

# Inicia o Apache
CMD ["apache2-foreground"]
