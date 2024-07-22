import express from 'express';
import { getCliente, cadastrarCliente, getOneCliente, editarCliente, deletarCliente } from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', getCliente);
router.post('/criar', cadastrarCliente);
router.get('/clientes/:id', getOneCliente);
router.put('/clientes/:id', editarCliente);
router.delete('/clientes/:id', deletarCliente);

export default router;
