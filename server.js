import "dotenv/config";
import express from "express";

import "./models/livroModel.js";
import "./models/funcionariosModel.js";
import "./models/clienteModel.js"
import "./models/emprestimosModel.js"

// importação rotas

import LivroRoutes from "./routes/livroRoutes.js"
import funcionarioRoutes from "./routes/funcionarioRouter.js"
import clienteRoutes from "./routes/clienteRoutes.js"
import emprestimosRoutes from "./routes/emprestimosRoutes.js"

const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//utilização das rotas
app.use('/livros', LivroRoutes)
app.use('/funcionario', funcionarioRoutes)
app.use('/clientes', clienteRoutes)
app.use('/emprestimos', emprestimosRoutes)

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
