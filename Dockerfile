# Usa una imagen de Node.js como base
FROM node

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el código de la aplicación al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que se ejecuta tu aplicación Express
EXPOSE 90

#port es una variable de entorno que en www si no se pasa toma el 3000
ENTRYPOINT PORT=90 DATABASE_URL=mysql://root:J0PgXdbMH379LYdfkLqN@containers-us-west-92.railway.app:6436/railway npm start
