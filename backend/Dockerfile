# Usa a imagem oficial do PHP com Apache
FROM php:7.4-apache

# Habilita o módulo de regravação do Apache para URLs amigáveis (opcional, mas útil)
RUN a2enmod rewrite

# Copia o código do backend para o diretório padrão do Apache no contêiner
COPY . /var/www/html

# Define permissões para o código PHP no contêiner
RUN chown -R www-data:www-data /var/www/html

# Exponha a porta do Apache (porta padrão 80, mapeada externamente para 8000 ou a que precisar)
EXPOSE 80

# Inicia o Apache em modo de primeiro plano
CMD ["apache2-foreground"]
