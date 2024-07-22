import express from 'express';
import { getEmprestimos, cadastrarEmprestimos } from '../controllers/emprestimosController.js';

const router = express.Router();

router.get('/', getEmprestimos);
router.post('/criar', cadastrarEmprestimos);

export default router;
