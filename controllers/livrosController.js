import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getLivros = (request, response) => {
  const sql = `SELECT * FROM livros`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro ao buscar livros" });
    }
    response.status(200).json(data);
  });
};

export const cadastrarLivro = (request, response) => {
  const { titulo, autor, ano_publicacao, genero, preco, disponibilidade } = request.body;

  if (!titulo || !autor || !ano_publicacao || !genero || !preco || disponibilidade === undefined) {
    return response.status(400).json({
      msg: "Todos os campos são obrigatórios, incluindo disponibilidade",
    });
  }

  const id = uuidv4();
  const sql = `
    INSERT INTO livros (livro_id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [id, titulo, autor, ano_publicacao, genero, preco, disponibilidade];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro ao cadastrar livro" });
    }
    response.status(201).json({ message: "Livro cadastrado com sucesso", id });
  });
};

export const getOneLivro = (req, res) => {
  const { livro_id } = req.params;

  const checkSqlId = "SELECT * FROM livros WHERE livro_id = ?";
  conn.query(checkSqlId, [livro_id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao buscar o livro escolhido" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Livro não encontrado na base de dados" });
    }

    res.status(200).json(data[0]); 
  });
};

export const editarLivro = (request, response) => {
  const { livro_id } = request.params;
  const { titulo, autor, ano_publicacao, genero, preco, disponibilidade } = request.body;

  if (!titulo || !autor || !ano_publicacao || !genero || !preco || disponibilidade === undefined) {
    return response.status(400).json({ msg: "Todos os campos são obrigatórios, incluindo disponibilidade" });
  }

  const checkSql = `SELECT * FROM livros WHERE livro_id = ?`;
  conn.query(checkSql, [livro_id], (err, data) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro ao buscar livro" });
    }

    if (data.length === 0) {
      return response.status(404).json({ message: "Livro não encontrado" });
    }

    const updateSql = `UPDATE livros SET 
      titulo = ?, 
      autor = ?, 
      ano_publicacao = ?, 
      genero = ?, 
      preco = ?, 
      disponibilidade = ? 
      WHERE livro_id = ?`;

    const updateValues = [titulo, autor, ano_publicacao, genero, preco, disponibilidade, livro_id];

    conn.query(updateSql, updateValues, (err) => {
      if (err) {
        console.error(err);
        return response.status(500).json({ message: "Erro ao atualizar livro" });
      }
      return response.status(200).json({ message: "Livro atualizado" });
    });
  });
};

export const deletarLivro = (request, response) => {
  const { livro_id } = request.params;

  const deleteSql = "DELETE FROM livros WHERE livro_id = ?";
  conn.query(deleteSql, [livro_id], (err, info) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro ao deletar o livro" });
    }

    if (info.affectedRows === 0) {
      return response.status(404).json({ message: "Livro não encontrado" });
    }

    return response.status(200).json({ message: "Livro deletado com sucesso" });
  });
};
