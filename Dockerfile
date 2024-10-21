# Dockerfile.nextjs

# Etapa 1: Construir la aplicación
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar los archivos de la aplicación
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Generar el cliente Prisma
RUN npx prisma generate

# Verificar que se hayan copiado los archivos correctamente
RUN ls -la /app/server/lib

# Copiar el archivo de variables de entorno
COPY .env .env

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:latest

# Copiar los archivos estáticos generados en la etapa de construcción
COPY --from=builder /app/.next /usr/share/nginx/html/.next
COPY --from=builder /app/public /usr/share/nginx/html/public

# Copiar configuración personalizada de Nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para Nginx
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
