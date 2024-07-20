import { Router } from "express";

import { getFuncionario, cadastrarFuncionario, getOneFuncionario, editarFuncionario } from "../controllers/funcionarioController.js";

const router = Router();

router.get("/", getFuncionario);

router.post("/criar", cadastrarFuncionario);

router.get("/:id", getOneFuncionario);

router.put("/editar/:id", editarFuncionario);

// router.delete("/remover/:id", deletarFuncionario);


export default router;
