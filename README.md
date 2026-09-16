# CRUD-con-Mongodb
CRUD de pizzeria
Descripción del proyecto

API REST desarrollada con Node.js y Express que permite gestionar un catálogo de pizzas mediante operaciones CRUD (Crear, Leer, Actualizar y Borrar). El proyecto originalmente almacenaba las pizzas en un arreglo en memoria, y fue migrado para persistir la información en una base de datos MongoDB, utilizando el driver oficial de MongoDB para Node.js (mongodb).

Tecnologías utilizadas
Node.js
Express
MongoDB (driver oficial mongodb)
CORS
Postman (para pruebas de los endpoints)

Requisitos previos
Antes de ejecutar el proyecto, asegúrate de tener instalado:

Node.js (v18 o superior recomendado)
MongoDB corriendo localmente en localhost:27017, o bien Docker si prefieres correr MongoDB en un contenedor.
Postman para probar los endpoints.
Instalación
Clona este repositorio:
bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
Entra a la carpeta del proyecto:
bash
   cd tu-repositorio
Instala las dependencias:
bash
   npm install
Configuración de la base de datos

El proyecto se conecta a MongoDB mediante una cadena de conexión definida como constante en repositorios/pizza.repositorio.js:

javascript
const cadenaConexion = "mongodb://root:12345678@localhost:27017/";

Por defecto, se conecta a una instancia local de MongoDB con usuario root y contraseña 12345678. Si tu instancia de MongoDB tiene credenciales distintas, o corre en otro host/puerto, actualiza esta constante antes de ejecutar el proyecto.

El proyecto utiliza la base de datos pizzeria y la colección pizzas. Ambas se crean automáticamente la primera vez que se inserta un documento, por lo que no es necesario crearlas manualmente.

Ejecución del proyecto
Asegúrate de que MongoDB esté corriendo (mongod, servicio de Windows, o contenedor Docker activo).
Levanta el servidor:
bash
   node index.js
Si todo funciona correctamente, verás en la consola:
   Servidor Express escuchando en el puerto http://localhost:3000
Endpoints disponibles
Método	Ruta	Descripción
GET	/api/v1/pizzas	Obtiene todas las pizzas
GET	/api/v1/pizzas/:id	Obtiene una pizza por su id
POST	/api/v1/pizzas	Crea una nueva pizza
PUT	/api/v1/pizzas/:id	Actualiza una pizza existente
DELETE	/api/v1/pizzas/:id	Elimina una pizza existente
Pruebas con Postman

A continuación se detalla cómo probar cada endpoint utilizando Postman.

1. Obtener todas las pizzas
Método: GET
URL: http://localhost:3000/api/v1/pizzas
Body: No requiere.
Respuesta esperada: Un arreglo JSON con las pizzas almacenadas (vacío [] si no hay ninguna registrada aún).
2. Crear una nueva pizza
Método: POST
URL: http://localhost:3000/api/v1/pizzas
Body: raw → JSON
json
  {
      "nombre": "Hawaiana",
      "precio": 120,
      "ingredientes": ["piña", "jamón"]
  }
Respuesta esperada: Status 201 con la pizza creada, incluyendo el _id generado por MongoDB:
json
  {
      "_id": "6aaa20a93db2c279458f72bf",
      "nombre": "Hawaiana",
      "precio": 120,
      "ingredientes": ["piña", "jamón"]
  }

Copia ese _id, ya que se usa en los siguientes pasos.

3. Obtener una pizza por id
Método: GET
URL: http://localhost:3000/api/v1/pizzas/{id} (reemplaza {id} por el _id obtenido en el paso anterior)
Body: No requiere.
Respuesta esperada: El objeto JSON de esa pizza específica.
4. Actualizar una pizza
Método: PUT
URL: http://localhost:3000/api/v1/pizzas/{id}
Body: raw → JSON (solo los campos a modificar)
json
  {
      "precio": 150
  }
Respuesta esperada:
json
  {
      "mensaje": "Pizza actualizada correctamente"
  }

Puedes repetir el paso 3 (GET por id) para confirmar que el campo cambió.

5. Borrar una pizza
Método: DELETE
URL: http://localhost:3000/api/v1/pizzas/{id}
Body: No requiere.
Respuesta esperada:
json
  {
      "mensaje": "Pizza borrada correctamente"
  }

Puedes repetir el paso 3 (GET por id) o el paso 1 (GET todas) para confirmar que ya no existe.

Estructura del proyecto
├── index.js                          # Punto de entrada, define las rutas de la API
├── repositorios/
│   └── pizza.repositorio.js          # Lógica de acceso a datos (MongoDB)
├── package.json
└── README.md
