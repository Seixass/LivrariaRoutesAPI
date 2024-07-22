import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";


export const getEmprestimos = (request, response) => {
  const sql = `SELECT * FROM emprestimos`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar emprestimos" });
      return;
    }
    response.status(200).json(data);
  });
};

export const cadastrarEmprestimos = (request, response) => {
    const { cliente_id, livro_id, data_emprestimo, data_devolucao } = request.body;
  
    if (!cliente_id || !livro_id || !data_emprestimo || !data_devolucao) {
      return response.status(400).json({
        msg: "Todos os campos são obrigatórios",
      });
    }
  
    const id = uuidv4();
    const sql = `
      INSERT INTO emprestimos (cliente_id, name_cliente, email, senha, imagem)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [cliente_id, livro_id, data_emprestimo, data_devolucao];
  
    conn.query(sql, values, (err) => {
      if (err) {
        console.error(err);
        return response.status(500).json({ message: "Erro ao cadastrar cliente" });
      }
      return response.status(201).json({ message: "Cliente cadastrado com sucesso", id });
    });
  };