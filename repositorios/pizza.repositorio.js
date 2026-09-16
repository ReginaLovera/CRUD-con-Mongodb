import { MongoClient, ObjectId } from "mongodb";

const cadenaConexion = "mongodb://root:12345678@localhost:27017/";
const nombreBaseDatos = "pizzeria";
const nombreColeccion = "pizzas";

const cliente = new MongoClient(cadenaConexion);

/**
 * Obtiene (y cachea) la referencia a la colección de pizzas,
 * conectando el cliente si aún no lo está.
 *
 * @returns {Promise<import('mongodb').Collection>} Colección de pizzas.
 */
async function obtenerColeccionAsync() {
    if (!cliente.topology || !cliente.topology.isConnected()) {
        await cliente.connect();
    }
    return cliente.db(nombreBaseDatos).collection(nombreColeccion);
}

/**
 * Obtiene todas las pizzas almacenadas.
 *
 * @returns {Array} Lista de pizzas.
 */
export async function obtenerTodasLasPizzasAsync() {
    const coleccion = await obtenerColeccionAsync();
    return coleccion.find({}).toArray();
}

/**
 * Obtiene una pizza utilizando su identificador.
 *
 * @param {*} id Identificador de la pizza.
 * @returns {Object|undefined} Pizza encontrada o undefined.
 */
export async function obtenerPizzaPorIdAsync(id) {
    const coleccion = await obtenerColeccionAsync();
    const pizza = await coleccion.findOne({ _id: new ObjectId(id) });
    return pizza ?? undefined;
}

/**
 * Agrega una nueva pizza.
 *
 * @param {*} pizza Información de la pizza.
 * @returns {Object} Resultado de la inserción, incluyendo el id generado.
 */
export async function agregarPizzaAsync(pizza) {
    const coleccion = await obtenerColeccionAsync();
    const resultado = await coleccion.insertOne(pizza);
    return { _id: resultado.insertedId, ...pizza };
}

/**
 * Actualiza una pizza existente.
 *
 * @param {*} id Identificador de la pizza.
 * @param {*} pizza Datos a actualizar.
 * @returns {void} No devuelve información.
 */
export async function actualizarPizzaAsync(id, pizza) {
    const coleccion = await obtenerColeccionAsync();
    await coleccion.updateOne(
        { _id: new ObjectId(id) },
        { $set: pizza }
    );
}

/**
 * Borra una pizza existente.
 *
 * @param {*} id Identificador de la pizza.
 * @returns {void} No devuelve información.
 */
export async function borrarPizzaAsync(id) {
    const coleccion = await obtenerColeccionAsync();
    await coleccion.deleteOne({ _id: new ObjectId(id) });
}