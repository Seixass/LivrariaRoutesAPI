import conn from "../config/conn.js";
import { v4 as uuidv4 } from "uuid";

export const getFuncionario = (request, response) => {
    const sql = /*sql*/ `SELECT * FROM employees`;
    conn.query(sql, (err, data) => {
      if (err) {
        response.status(500).json({ message: "Erro ao buscar funcionario" });
        return;
      }
      const livros = data;
      response.status(200).json(livros);
    });
  };

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

  export const getOneFuncionario = (req, res) => {
    const { id } = req.params;

    const checkSqlId = "SELECT * FROM employees where id = ?"
    conn.query(checkSqlId, [id], (err, data) => {
    if(err) {
        return res.status(500).json({message: "Error ao buscar o funcionario escolhido!"})
    }

    if (data.length === 0) {
        res.status(404).json({message: "Funcionario não encontrado na base de dados!"})
    }

    res.status(200).json(data)
    })  
};

export const editarFuncionario =  (request, response) => {
  const { id } = request.params;
  const { name_employee, sobrenome_employee, idade, data_contratacao, email_employee, salario, meta_vendas } = request.body;

  if (!name_employee || !sobrenome_employee || !idade || !data_contratacao || !email_employee|| !salario|| !meta_vendas) {
    return response
      .status(400)
      .json({ msg: "Todos os campos são obrigatórios" });
  }

  const checkSql = `SELECT * FROM employees WHERE id = "${id}"`;
  conn.query(checkSql, (err, data) => {
    if (err) {
      console.log(err);
      return response.status(500).json({ message: "Erro ao buscar funcionário" });
    }

    if (data.length === 0) {
      return response.status(404).json({ message: "Funcionário não encontrado" });
    }

    // Consulta SQL para atualizar funcionário
    const updateSql = `
      UPDATE funcionarios SET
      name_employee = "${name_employee}",
      sobrenome_employee = "${sobrenome_employee}",
      idade = "${idade}",
      data_contratacao = "${data_contratacao}",
      email_employee = "${email_employee}"
      salario = "${salario}"
      meta_vendas = "${meta_vendas}"
      WHERE id = "${id}"
    `;

    conn.query(updateSql, (err) => {
      if (err) {
        console.error(err);
        return response.status(500).json({ message: "Erro ao atualizar o funcionário" });
      }
      return response.status(200).json({ message: "Funcionário atualizado" });
    });
  });
}
  