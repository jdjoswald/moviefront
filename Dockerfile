# Se utiliza una imagen de Node como base
FROM node:14-alpine

# Establecer el directorio de trabajo para la aplicación
WORKDIR /app

# Copiar el archivo package.json a la imagen
COPY package.json .

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos de la aplicación a la imagen
COPY . .

# Compilar la aplicación
RUN npm run build

# Exponer el puerto 3000 para acceder a la aplicación
EXPOSE 3000

# Ejecutar la aplicación al iniciar el contenedor
CMD ["npm", "start"]