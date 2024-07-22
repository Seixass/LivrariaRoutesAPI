import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";


export const getCliente = (request, response) => {
  const sql = `SELECT * FROM clientes`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar clientes" });
      return;
    }
    response.status(200).json(data);
  });
};


export const cadastrarCliente = (request, response) => {
  const { name_cliente, email, senha, imagem } = request.body;

  if (!name_cliente || !email || !senha || !imagem) {
    return response.status(400).json({
      msg: "Todos os campos são obrigatórios",
    });
  }

  const id = uuidv4();
  const sql = `
    INSERT INTO clientes (cliente_id, name_cliente, email, senha, imagem)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [id, name_cliente, email, senha, imagem];

  conn.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro ao cadastrar cliente" });
    }
    return response.status(201).json({ message: "Cliente cadastrado com sucesso", id });
  });
};


export const getOneCliente = (req, res) => {
  const { cliente_id } = req.params;

  const checkSqlId = "SELECT * FROM clientes WHERE id = cliente_id";
  conn.query(checkSqlId, [cliente_id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar o cliente escolhido!" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Cliente não encontrado na base de dados!" });
    }

    return res.status(200).json(data);
  });
};


export const editarCliente = (request, response) => {
  const { cliente_id } = request.params;
  const { name_cliente, email, senha, imagem } = request.body;

  if (!name_cliente || !email || !senha || !imagem) {
    return response.status(400).json({ msg: "Todos os campos são obrigatórios" });
  }

  const checkSql = `SELECT * FROM clientes WHERE id = ?`;
  conn.query(checkSql, [cliente_id], (err, data) => {
    if (err) {
      console.log(err);
      return response.status(500).json({ message: "Erro ao buscar cliente" });
    }

    if (data.length === 0) {
      return response.status(404).json({ message: "Cliente não encontrado" });
    }


    const updateSql = `
      UPDATE clientes SET
      name_cliente = ?,
      email = ?,
      senha = ?,
      imagem = ?
      WHERE cliente_id = ?
    `;
    const values = [name_cliente, email, senha, imagem, id];

    conn.query(updateSql, values, (err) => {
      if (err) {
        console.error(err);
        return response.status(500).json({ message: "Erro ao atualizar o cliente" });
      }
      return response.status(200).json({ message: "Cliente atualizado com sucesso" });
    });
  });
};


export const deletarCliente = (request, response) => {
  const { cliente_id } = request.params;

  const deleteSql = "DELETE FROM clientes WHERE cliente_id = ?";
  conn.query(deleteSql, [cliente_id], (err, info) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro ao deletar cliente" });
    }

    if (info.affectedRows === 0) {
      return response.status(404).json({ message: "Cliente não encontrado" });
    }

    return response.status(200).json({ message: "Cliente deletado com sucesso" });
  });
};
