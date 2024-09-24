# Usa la imagen oficial de Node.js con la versión 20.17.0
FROM node:20.17.0

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto en el que correrá la aplicación (por defecto, NestJS usa el puerto 3000)
EXPOSE 3000

# Compila la aplicación (si es TypeScript)
RUN npm run build

# Inicia la aplicación
CMD ["npm", "run", "start:prod"]