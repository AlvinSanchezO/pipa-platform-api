#  pipa-platform-api 💧🚚

API RESTful para la plataforma de monitoreo de agua y gestión de servicios de pipas. Este backend gestiona usuarios, proveedores, pedidos y reportes comunitarios sobre el estado del suministro de agua.

## Tabla de Contenidos
- [Stack Tecnológico](#stack-tecnológico-)
- [Instalación](#instalación-)
- [Configuración](#configuración-)
- [Uso](#uso-)
- [Documentación de la API](#documentación-de-la-api-)

---

## Stack Tecnológico 💻
* **Lenguaje:** JavaScript
* **Entorno:** Node.js
* **Framework:** Express.js
* **Base de Datos:** Microsoft SQL Server
* **ORM:** Sequelize

---

## Instalación 🛠️

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/AlvinSanchezO/Pipa-Platform-API.git](https://github.com/AlvinSanchezO/Pipa-Platform-API.git)
    ```

2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd pipa-platform-api
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

---

## Configuración ⚙️

1.  **Crea el archivo de variables de entorno:** En la raíz del proyecto, crea un archivo llamado `.env`.

2.  **Añade tus credenciales de la base de datos** al archivo `.env`. Reemplaza los valores de ejemplo con tus datos reales.
    ```env
    DB_USER=tu_usuario_sql
    DB_PASSWORD=tu_contraseña_sql
    DB_HOST=localhost
    DB_NAME=pipas_db
    ```

---

## Uso ▶️

1.  **Inicia el servidor en modo de desarrollo:**
    Este comando utiliza `nodemon` para reiniciar el servidor automáticamente cada vez que se detecta un cambio en los archivos.
    ```bash
    npm start
    ```
2.  El servidor estará corriendo en `http://localhost:3000`.

---

## Documentación de la API 📘

Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva de la API, generada con Swagger, en la siguiente URL:

**[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**