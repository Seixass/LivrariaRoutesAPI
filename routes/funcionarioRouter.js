import express from 'express';
import { getFuncionario, cadastrarFuncionario, getOneFuncionario, editarFuncionario, deletarFuncionario } from '../controllers/funcionarioController.js';

const router = express.Router();

router.get('/funcionarios', getFuncionario);
router.post('/funcionarios', cadastrarFuncionario);
router.get('/funcionarios/:id', getOneFuncionario);
router.put('/funcionarios/:id', editarFuncionario);
router.delete('/funcionarios/:id', deletarFuncionario);

export default router;
