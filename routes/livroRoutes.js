import { Router } from "express";

//import controllers
import { getLivros, cadastrarLivro, getOneLivro, editarLivro, deletarLivro } from "../controllers/livrosController.js";

const router = Router();

router.get("/", getLivros);

router.post("/criar", cadastrarLivro);

router.get("/:id", getOneLivro);

router.put("/editar/:id", editarLivro);

router.delete("/remover/:id", deletarLivro);


export default router;
