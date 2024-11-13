# Usa a imagem oficial do PHP para rodar o backend
FROM php:7.4-apache

# Copia o código PHP para o diretório padrão do Apache
COPY . /var/www/html

# Configura as permissões de propriedade e acesso
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# Exponha a porta que o Apache está ouvindo
EXPOSE 5016

# Inicia o Apache em modo de primeiro plano
CMD ["apache2-foreground"]
