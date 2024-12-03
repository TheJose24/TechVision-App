FROM node:20-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm ci --production=false

# Copia el resto del código de la aplicación
COPY . .

# Compila la aplicación Angular
RUN npm run build -- --configuration production

# Usa una imagen Nginx para servir la aplicación Angular
FROM nginx:alpine-slim

# Copia la configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia el build de Angular al directorio de Nginx
COPY --from=build /app/dist/tech-vision-app/browser /usr/share/nginx/html

# Configurar permisos y directorios necesarios
RUN apk add --no-cache brotli \
    && mkdir -p /var/cache/nginx/{client_temp,proxy_temp,fastcgi_temp,uwsgi_temp,scgi_temp} \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && chown -R nginx:nginx /etc/nginx/conf.d \
    && chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html \
    && touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run/nginx.pid

# Use non-root user for security
USER nginx

# Exposición del puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
