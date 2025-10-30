# pipa-platform-api 💧🚚

API RESTful para la plataforma comunitaria de monitoreo de agua y gestión de servicios de pipas en la región.

## Resumen del Proyecto

* **Problemática:** Incertidumbre sobre el suministro de agua ("tandeo"), falta de información en tiempo real y proceso ineficiente/opaco para contratar pipas de agua.
* **Solución:** Una API centralizada que provee datos sobre el tandeo (futuro), estado del servicio basado en reportes comunitarios, y un marketplace transparente para conectar usuarios con proveedores de pipas verificados.

## Tabla de Contenidos
- [Stack Tecnológico](#stack-tecnológico-)
- [Características Principales](#características-principales-)
- [Instalación](#instalación-)
- [Configuración](#configuración-️)
- [Uso](#uso-️)
- [Documentación de la API](#documentación-de-la-api-)

---

## Stack Tecnológico 💻
* **Lenguaje:** JavaScript
* **Entorno:** Node.js
* **Framework:** Express.js
* **Base de Datos:** Microsoft SQL Server
* **ORM:** Sequelize
* **Autenticación:** JWT (JSON Web Tokens)
* **Documentación:** Swagger (manual via `swagger.json`)

---

## Características Principales ✨
La API actualmente implementa las siguientes funcionalidades:

* **Autenticación:** Registro (`/register`) e Inicio de Sesión (`/login`) para usuarios.
* **Usuarios:** Obtener perfil del usuario autenticado (`/user/profile`).
* **Proveedores:**
    * Listar proveedores aprobados (`/proveedores`).
    * Registrar un perfil de proveedor (vinculado a un usuario) (`/proveedores/register`).
    * Obtener los pedidos asignados a un proveedor (`/proveedores/mis-pedidos`).
    * Actualizar el perfil propio de un proveedor (`/proveedores/mi-perfil`).
* **Pedidos:**
    * Crear un nuevo pedido a un proveedor (`/pedidos`).
    * Obtener el historial de pedidos del usuario (`/pedidos`).
    * Calificar un pedido (`/pedidos/:pedidoId/rate`).
    * Actualizar estado de un pedido (por proveedor) (`/pedidos/:pedidoId/status`).
* **Reportes:**
    * Enviar un reporte sobre el estado del agua (`/reportes`).
    * Consultar estado consolidado por colonia (`/reportes/colonia/:nombreColonia`).
* **Administración:**
    * Aprobar un proveedor pendiente (`/admin/proveedores/:providerId/approve`).

---

## Instalación 🛠️

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/AlvinSanchezO/Pipa-Platform-API.git](https://github.com/AlvinSanchezO/Pipa-Platform-API.git)
    cd pipa-platform-api
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura la Base de Datos:**
    * Asegúrate de tener **Microsoft SQL Server** instalado y corriendo.
    * Crea una base de datos vacía llamada `pipas_db`. Sequelize creará las tablas automáticamente en el primer arranque.

---

## Configuración ⚙️

1.  **Crea el archivo `.env`:** En la raíz del proyecto, crea un archivo llamado `.env` copiando el archivo `.env.example` (si existiera) o créalo desde cero.

2.  **Define las Variables de Entorno:** Añade las siguientes variables al archivo `.env` y reemplaza los valores con tu configuración local:
    ```env
    # Credenciales de la Base de Datos
    DB_USER=tu_usuario_sql
    DB_PASSWORD=tu_contraseña_sql
    DB_HOST=localhost # o el nombre de tu servidor/instancia
    DB_NAME=pipas_db

    # Secreto para firmar los JSON Web Tokens (JWT)
    # ¡Cámbialo por una cadena larga, aleatoria y segura!
    JWT_SECRET=TU_SECRETO_JWT_AQUI 

    # Puerto en el que correrá el servidor (opcional, por defecto 3000)
    # PORT=3000 
    ```
    **Importante:** Asegúrate de que `JWT_SECRET` sea una cadena secreta y única para tu aplicación.

---

## Uso ▶️

1.  **Inicia el servidor en modo de desarrollo:**
    Este comando utiliza `nodemon` para reiniciar automáticamente el servidor al detectar cambios.
    ```bash
    npm start
    ```
2.  El servidor estará corriendo en `http://localhost:3000` (o el puerto que definiste en `.env`). La base de datos se sincronizará y las tablas se crearán la primera vez.

---

## Documentación de la API 📘

Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva de la API, generada con Swagger (a partir del archivo `swagger.json`), en la siguiente URL:

**[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Esta documentación te permite ver todos los endpoints, sus parámetros, cuerpos de solicitud esperados y respuestas, además de probarlos directamente desde el navegador.

---
