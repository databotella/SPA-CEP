# Usa a imagem oficial do Node.js para construir o projeto
FROM node:16 as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Usa uma imagem leve do Nginx para servir a aplicação
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5015
CMD ["nginx", "-g", "daemon off;"]
