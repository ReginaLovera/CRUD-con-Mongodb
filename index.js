const express = require("express");
const app = express();
const PORT = 3000;

// Ruta principal
app.get("/", (req, res) => {
    const saludo = {
        mensaje: "Bienvenido a la Api Fes Aragon V1"
    };

    return res.json(saludo);
});

// Lista de pizzas
app.get("/api/v1/pizzas", (req, res) => {
    const pizzas = [
        "Napolitana",
        "Siciliana",
        "Calzone",
        "4 quesos",
        "Margarita",
        "Estilo Chicago",
        "Al Taglio"
    ];

    return res.json(pizzas);
});

// Lista de tamaños
app.get("/api/v1/tamanios", (req, res) => {
    const tamaños = [
        "Personal",
        "Mediana",
        "Grande"
    ];

    return res.json(tamaños);
});

// Lista de bebidas
app.get("/api/v1/bebidas", (req, res) => {
    const bebidas = [
        "Coca-Cola Diet",
        "Limonada",
        "Naranjada",
        "Agua"
    ];

    return res.json(bebidas);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});