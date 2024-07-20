import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getLivros = (request, response) => {
  const sql = /*sql*/ `SELECT * FROM livros`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar livros" });
      return;
    }
    const livros = data;
    response.status(200).json(livros);
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
  const sql = /*sql*/ `
    INSERT INTO livros (id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [id, titulo, autor, ano_publicacao, genero, preco, disponibilidade];

  conn.query(sql, values, (err, result) => {
    if (err) {
      response.status(500).json({ message: "Erro ao cadastrar livro" });
      return;
    }
    response.status(201).json({ message: "Livro cadastrado com sucesso", id });
  });
};

export const getOneLivro =  (req, res) => {
    const { id } = req.params;

    const checkSqlId = "SELECT * FROM livros where id = ?"
    conn.query(checkSqlId, [id], (err, data) => {
    if(err) {
        return res.status(500).json({message: "Error ao buscar o livro escolhido!"})
    }

    if (data.length === 0) {
        res.status(404).json({message: "Livro não encontrado na base de dados!"})
    }

    res.status(200).json(data)
    })  
};

export const editarLivro = (request, response) => {
    const { id } = request.params;
    const { titulo, autor, ano_publicacao, genero, preco, disponibilidade } = request.body;

    if (!titulo || !autor || !ano_publicacao || !genero || !preco || disponibilidade === undefined) {
        return response.status(400).json({ msg: "Todos os campos são obrigatórios, incluindo disponibilidade" });
    }

    const checkSql = `SELECT * FROM livros WHERE id = ?`;
    conn.query(checkSql, [id], (err, data) => {
        if (err) {
            console.log(err);
            return response.status(500).json({ message: "Erro ao buscar livro" });
        }

        if (data.length === 0) {
            return response.status(404).json({ message: "Livro não encontrado" });
        }

        // Consulta SQL para atualizar livro
        const updateSql = `UPDATE livros SET 
            titulo = ?, 
            autor = ?, 
            ano_publicacao = ?, 
            genero = ?, 
            preco = ?, 
            disponibilidade = ? 
            WHERE id = ?`;

        const updateValues = [titulo, autor, ano_publicacao, genero, preco, disponibilidade, id];

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
    const { id } = request.params;
  
    const deleteSql = "DELETE FROM livros WHERE id = ?";
    conn.query(deleteSql, [id], (err, info) => {
        if (err) {
            console.error(err);
            return response.status(500).json({ message: "Erro ao encontrar o livro!" });
        }
     
        if (info.affectedRows === 0) {
            return response.status(404).json({ message: "Livro não encontrado!" });
        }
  
        return response.status(200).json({ message: "Livro deletado com sucesso!" });
    });
};
