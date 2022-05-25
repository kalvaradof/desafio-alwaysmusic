-- Requerimientos
-- 1. Realizar la conexión con PostgreSQL con la clase Client.
-- 2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
-- 3. Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
-- 4. Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
-- 5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
-- 6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.

CREATE DATABASE alwaysmusic_db;
-- con \c nos vamos a la database
\c alwaysmusic_db

--Crear una tabla "estudiantes" ● Nombre ● Rut ● Curso ● Nivel
CREATE TABLE estudiantes (
    nombre varchar(50) NOT NULL,
    rut varchar(12) NOT NULL PRIMARY KEY,
    curso varchar(20) NOT NULL,
    nivel int NOT NULL
);