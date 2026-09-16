// definimos las rutas
app.get("/", (req, res) => {
    const saludo = { mensaje: "Bienvenido a la Api Fes Aragon V1" };
    return res.json(saludo);
});

app.get("/api/v1/saludos", (req, res) => {
    const saludo = { mensaje: "Hola mundo desde nodejs" };
    return res.json(saludo);
});

app.get("/api/v1/error", (req, res) => {
    const saludo = { mensaje: "Oops, ocurrio un error" };
    return res.status(500).json(respuesta);
});

app.post("/api/v1/pizzas", (req, res)=>{
    const body = req.body
    console.log(pizza)
    //guardarPizza(pizza)
    const respuestaDto ={
        mensaje : "pizza agregada",
        id : 1,
        fecha : new Date()
    }
    return res.status(201).json(respuestaDto);
})

/**
 * regresa una pizza por el id
 * Esta es la simulación para la conexión a db
 * @param {*} id 
 */
function obtenerPizzaPorId(id){
    //se conecta a la db
    //busca la en la tabla 0 colección
    //regresa el elemento
    return { nombre: "Hawaiana", descripción: "Jamón y piña" }
}

app.get("/api/v1/pizzass/:id", (req, res) => {
    console.log("id",id);
    const id = req.params.id;
    const  pizza = obtenerPizzaPorId(id)
    return res.status(200).json(pizzas);
});

app.get("/api/v1/placeholder", async (req, res)=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    console.log(response)
    const json = await response.json()

    return res.status(200).json(json)
});
