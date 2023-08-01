BACKEND GESTIÓN DE USUARIOS CON CONTROL DE AUTENTICACIÓN Y REGISTRO CON PASSPORT

Controladores de USER.-
· signUp:
    creado control de rol para evitar que alguien pueda registrar un usuario fuera de la web (postman o insomnia por ejemplo), forzando el rol 'admin'. Este control está pensado para una situación posterior en el que solo los admin puedan hacer ciertas gestiones.

· getAllUsers:
    consulta para mostrar listado de todos los usuarios registrador. Solo los usuarios autenticados pueden realizar esta petición.

· getUserById:
    consulta para mostrar toda la información de un usuario, pasando por parámetros el id de este. Solo los usuarios registrados pueden realizar esta petición.

· updateUser:
    Método para poder actualizar los datos de cualquier usuario. Solo los usuarios registrador pueden realizar esta petición. A futuro, lo ideal es que el usuario solo pueda modificar sus propios datos o, que sea admin y pueda modificar el rol de cualquier usuario.

· deleteUser:
    Método para poder eliminar cualquier usuario. Solo los usuarios registrados pueden realizar esta petición. A futuro, lo ideal es que el propio usuario sea quien pueda eliminar su cuenta o, que cualquier admin pueda eliminar cualquier usuario, siempre que no sea admin.

· login:
    Implementanda estrategia de autenticación local con passport-local para autenticación de usuario.

· isAuthenticated:
    Controlador creado como middleware para saber si un usuario ha iniciado sesión y está autenticado o no.


CORS configuradas para hacer uso de cookies
    