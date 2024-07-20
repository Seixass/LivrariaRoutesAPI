import "dotenv/config";
import express from "express";

import "./models/livroModel.js";
import "./models/funcionariosModel.js";

// importação rotas

import LivroRoutes from "./routes/livroRoutes.js"
import funcionarioRoutes from "./routes/funcionarioRouter.js"

const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//utilização das rotas
app.use('/livros', LivroRoutes)
app.use('/funcionario', funcionarioRoutes)

app.get("/", (request, response) => {
  response.send("Olá, Mundo!");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
