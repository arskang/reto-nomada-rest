# Reto Nómada

#### Instalar dependencias

- Para instalar las dependencias se debe abrir la consola en el directorio raíz y ejecutar el siguiente comando: `npm install`

#### Configuración de las variables de entorno

- Para modificar el **puerto** o la **secret key** (para el token), se debe realizar en el archivo `.env` que se encuentra en la raíz del directorio

#### Ejecutar el proyecto

- El proyecto se puede ejecutar de dos formas:
    
    - Desarrollo: `npm run nodemon` *(recomendado)*
    - Producción: `npm start`

- Otros comandos:

    - Convertir la documentación .apib a .html: `npm run aglio`

#### Documentación

- La documentación se puede encontrar:

    - Directorio raíz: `documentacion.apib`
    - En el directorio: `api/docs/postmanCollection.json` es una colección para utilizar con **Postman**
    - Ruta del servidor *(debe iniciarse el servidor)*: `http://localhost:3500/documentacion` *(o el puerto que se configura en .env)*