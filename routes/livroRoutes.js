import { Router } from "express";

//import controllers
import { getLivros, cadastrarLivro, getOneLivro, editarLivro, deletarLivro } from "../controllers/livrosController.js";

const router = Router();

router.get("/", getLivros);
router.post("/criar", cadastrarLivro);
router.get("/:livro_id", getOneLivro);
router.put("/editar/:livro_id", editarLivro);
router.delete("/remover/:livro_id", deletarLivro);


export default router;
