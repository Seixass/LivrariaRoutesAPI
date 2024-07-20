import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

// Função para buscar todos os funcionários
export const getFuncionario = (request, response) => {
  const sql = `SELECT * FROM employees`;
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar funcionários" });
      return;
    }
    response.status(200).json(data);
  });
};

// Função para cadastrar um novo funcionário
export const cadastrarFuncionario = (request, response) => {
  const { name_employee, sobrenome_employee, idade, data_contratacao, email_employee, salario, meta_vendas } = request.body;

  if (!name_employee || !sobrenome_employee || !idade || !data_contratacao || !email_employee || salario === undefined || meta_vendas === undefined) {
    return response.status(400).json({
      msg: "Todos os campos são obrigatórios",
    });
  }

  const id = uuidv4();
  const sql = `
    INSERT INTO employees (id, name_employee, sobrenome_employee, idade, data_contratacao, email_employee, salario, meta_vendas)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [id, name_employee, sobrenome_employee, idade, data_contratacao, email_employee, salario, meta_vendas];

  conn.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro ao cadastrar funcionário" });
    }
    return response.status(201).json({ message: "Funcionário cadastrado com sucesso", id });
  });
};

// Função para buscar um funcionário específico
export const getOneFuncionario = (req, res) => {
  const { id } = req.params;

  const checkSqlId = "SELECT * FROM employees WHERE id = ?";
  conn.query(checkSqlId, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar o funcionário escolhido!" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Funcionário não encontrado na base de dados!" });
    }

    return res.status(200).json(data);
  });
};

// Função para atualizar um funcionário
export const editarFuncionario = (request, response) => {
  const { id } = request.params;
  const { name_employee, sobrenome_employee, idade, data_contratacao, email_employee, salario, meta_vendas } = request.body;

  if (!name_employee || !sobrenome_employee || !idade || !data_contratacao || !email_employee || salario === undefined || meta_vendas === undefined) {
    return response.status(400).json({ msg: "Todos os campos são obrigatórios" });
  }

  const checkSql = `SELECT * FROM employees WHERE id = ?`;
  conn.query(checkSql, [id], (err, data) => {
    if (err) {
      console.log(err);
      return response.status(500).json({ message: "Erro ao buscar funcionário" });
    }

    if (data.length === 0) {
      return response.status(404).json({ message: "Funcionário não encontrado" });
    }

    // Consulta SQL para atualizar funcionário
    const updateSql = `
      UPDATE employees SET
      name_employee = ?,
      sobrenome_employee = ?,
      idade = ?,
      data_contratacao = ?,
      email_employee = ?,
      salario = ?,
      meta_vendas = ?
      WHERE id = ?
    `;
    const values = [name_employee, sobrenome_employee, idade, data_contratacao, email_employee, salario, meta_vendas, id];

    conn.query(updateSql, values, (err) => {
      if (err) {
        console.error(err);
        return response.status(500).json({ message: "Erro ao atualizar o funcionário" });
      }
      return response.status(200).json({ message: "Funcionário atualizado com sucesso" });
    });
  });
};

export const deletarFuncionario = (request, response) => {
  const { id } = request.params;

  const deleteSql = "DELETE FROM employees WHERE id = ?";
  conn.query(deleteSql, [id], (err, info) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ message: "Erro ao deletar funcionário" });
    }

    if (info.affectedRows === 0) {
      return response.status(404).json({ message: "Funcionário não encontrado" });
    }

    return response.status(200).json({ message: "Funcionário deletado com sucesso" });
  });
};
