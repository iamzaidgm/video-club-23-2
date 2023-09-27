# Usa una imagen de Node.js como base
FROM node

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el código de la aplicación al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que se ejecuta tu aplicación Express
EXPOSE 80

#port es una variable de entorno que en www si no se pasa toma el 3000
ENTRYPOINT PORT=80 npm start