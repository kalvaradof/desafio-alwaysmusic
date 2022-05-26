const { Pool } = require("pg");

const argumentos = process.argv
const funcion = argumentos[2]
const nombre = argumentos[3]
const rut = argumentos[4]
const curso = argumentos[5]
const nivel = argumentos[6]

//1. Realizar la conexión con PostgreSQL, utilizando la clase Pool y definiendo un máximo de 20 clientes, 
//5 segundos como tiempo máximo de inactividad de un cliente y 2 segundos de espera de un nuevo cliente.
const config = {
    user: "postgres",
    host: "localhost",
    password: "holahola",
    database: "alwaysmusic_db",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
};
const pool = new Pool(config);

// Agregar un nuevo estudiante.(node index.js funcion 'Adrian Pérez' '12.843.876-9' 'piano' 6)
async function ingresar() {
    const SQLQuery = {
        name: 'insertarEstudiante',
        text: 'insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;', // 3. Hacer las consultas con texto parametrizado.
        values: [nombre, rut, curso, nivel],
    }
    try {
        const res = await client.query(SQLQuery);
    } catch (error) { console.log(error.code); }
    console.log("Registro agregado con éxito: ", resul.rows[0]);
}

//2. Hacer todas las consultas con un JSON como argumento definiendo la propiedad name para el Prepared Statement.
// Consultar los estudiantes registrados.
async function consulta() {
    const SQLQuery = {
        rowMode: "array",
        name: 'sql-user', // prepared statement
        text:
            "SELECT * FROM estudiantes",
    };
    try {
        const res = await client.query(SQLQuery);
    } catch (error) { console.log(error.code); }
    console.log("Consulta Realizada: ", res.rows);
}


//  Consultar estudiante por rut (node index.js funcion nombre 12.543.876-9)
async function consultaRut() {
    const SQLQuery = {
        rowMode: "array",
        name: 'sql-user', // prepared statement
        text:
            `SELECT * FROM estudiantes where rut = $1`,
        values: [rut] // 7. Obtener el registro de los estudiantes registrados en formato de arreglos.
    };
    try {
        const res = await client.query(SQLQuery);
    } catch (error) { console.log(error.code); }
    console.log("Consulta realizada con exito: ", res.rows);
}

//  Actualizar la información de un estudiante ej:nivel(node index.js funcion nombre 12.456.786-8 curso 6).
async function actualizar() {
    const SQLQuery = {
        rowMode: "array",
        name: 'sql-user', // prepared statement
        text:
            `UPDATE estudiantes SET nivel = $2 WHERE rut = $1 RETURNING*; `,
        values: [rut, nivel]
    };
    // 5. Capturar los posibles errores en todas las consultas.
    try {
        const res = await client.query(SQLQuery);
    } catch (error) { console.log(error.code); }
    console.log("Actualizacion Realizada con exito: ", res.rows);
}

// Eliminar el registro de un estudiante(node index.js funcion nombre 12.543.876-9)
async function eliminar() {
    const SQLQuery = {
        rowMode: "array",
        name: 'sql-user', // prepared statement
        text:
            `DELETE FROM estudiantes WHERE rut = $1 RETURNING*; `,
        values: [rut]
    };
    try {
        const res = await client.query(SQLQuery);
    } catch (error) { console.log(error.code); }
    console.log("Registro eliminado con éxito: ", res.rows);
}

// 6. Retornar por consola un mensaje de error en caso de haber problemas de conexión.
pool.connect(async (error_conexion, client, release) => {
    if (error_conexion) {
        console.error(error_conexion.code)

    } else {
        if (funcion === 'ingresar') {
            await ingresar(nombre, rut, curso, nivel)
        }
        else if (funcion === 'consultar') {
            await consulta(nombre)// con (rut) no funciona por la posición de arv
        }
        else if (funcion === 'consultaRut') {
            await consultaRut()
        }
        else if (funcion === 'actualizar') {
            await actualizar(nivel)
        }
        else if (funcion === 'eliminar') {
            await eliminar(rut)
        }
        release() // 4. Liberar a un cliente al concluir su consulta.
        pool.end()
    }
})









