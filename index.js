const { Client } = require('pg');// importamos el modulo
const process = require('process')

const argumentos = process.argv
const funcion = argumentos[2]
const nombre = argumentos[3]
const rut = argumentos[4]
const curso = argumentos[5]
const nivel = argumentos[6]

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'alwaysmusic_db',
    password: 'espinoza',
    port: 5432,
}
const client = new Client(config);

async function consulta() {
    await client.connect() //para conectarte a la base de datos
    const res = await client.query('SELECT nombre FROM estudiantes')
    console.log(res)
    client.end()
}
// consulta()

//Registrar un nuevo estudiante
async function ingresar(nombre, rut, curso, nivel) {
    await client.connect()
    const res = await client.query(
        `insert into estudiantes(nombre, rut, curso, nivel) values ('${nombre}', '${rut}', '${curso}', ${nivel}) RETURNING *; `);
    console.log(res);
    client.end();
}
// ingresar();

//Obtener por consola el registro de un estudiante por medio de su rut.

async function consultaRut(rut) {
    await client.connect()
    const res = await client.query(`SELECT * FROM estudiantes where rut = '${rut}'
`);
    console.log(`Registro con el rut: ${rut}`, res.rows[0]);
}
// consultaRut('12.345.678-9')
//     .then(() => client.end());

//Obtener por consola todos los estudiantes registrados.

async function estudiantesRegistrados() {
    await client.connect()
    const res = await client.query("select * from estudiantes");
    console.log("Registro: ", res.rows);
}
// estudiantesRegistrados()
//     .then(() => client.end());


//Actualizar los datos de un estudiante en la base de datos.

async function actualizar() {
    await client.connect()
    const res = await client.query(
        `UPDATE estudiantes SET nivel = ${nivel} WHERE rut = '12.345.678-9' RETURNING*; `
);
    console.log('Registro modificado', res.rows[0]);
    client.end();
}
// actualizar();

//Eliminar el registro de un estudiante de la base de datos.

async function eliminar() {
    await client.connect()
    const res = await client.query(
        `DELETE FROM estudiantes WHERE rut = '${rut}' RETURNING*; `
    );
    console.log('Cantidad de registros afectados', res.rowCount);
    client.end();
}
// eliminar();

if (funcion === 'consulta') {
    consulta()
}
else if (funcion === 'ingresar') {
    ingresar(nombre, rut, curso, nivel)
}
else if (funcion === 'consultaRut') {
    consultaRut(nombre)// con (rut) no funciona por la posición de arv
}
else if (funcion === 'estudiantesRegistrados') {
    estudiantesRegistrados()
}
else if (funcion === 'actualizar') {
    actualizar(nivel)
}
else if (funcion === 'eliminar') {
    eliminar(rut)
}
