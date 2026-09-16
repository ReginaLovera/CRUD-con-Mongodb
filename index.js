import express from "express";
import cors from 'cors'
import { 
  obtenerTodasLasPizzasAsync, 
  obtenerPizzaPorIdAsync, 
  agregarPizzaAsync, 
  actualizarPizzaAsync, 
  borrarPizzaAsync 
} from './repositorios/pizza.repositorio.js'

const app = express();
app.use(cors())

const PORT = 3000; // Puerto en el que escuchará el servidor

//Configuración para usar el body en un metodo/verbo POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/pizzas", async (req, res) => {
  const pizzas = await obtenerTodasLasPizzasAsync()
  return res.status(200).json(pizzas);
});

app.get("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = await obtenerPizzaPorIdAsync(id)

  return res.status(200).json(pizza);
});

app.post("/api/v1/pizzas", async (req, res) => {
  const pizza = req.body
  const pizzaCreada = await agregarPizzaAsync(pizza)

  return res.status(201).json(pizzaCreada);
});

app.put("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = req.body
  await actualizarPizzaAsync(id, pizza)

  return res.status(200).json({ mensaje: "Pizza actualizada correctamente" });
});

app.delete("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  await borrarPizzaAsync(id)

  return res.status(200).json({ mensaje: "Pizza borrada correctamente" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor Express escuchando en el puerto http://localhost:${PORT}`,
  );
});