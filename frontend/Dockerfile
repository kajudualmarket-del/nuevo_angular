# frontend/Dockerfile (CORREGIDO)

# Usa la imagen oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app


RUN npm install -g @angular/cli@16.2.16

# Copia e instala dependencias para aprovechar el caché de capas de Docker
COPY package.json package-lock.json ./
RUN npm install

# Copia el código fuente (debe incluir package.json y package-lock.json)
COPY . .

# Asigna la propiedad de los archivos a 'node' (usuario no-root por defecto en esta imagen)
RUN chown -R node:node /app

# Cambia al usuario 'node' por seguridad
USER node

# El comando de inicio (ng serve) se define en docker-compose.yml