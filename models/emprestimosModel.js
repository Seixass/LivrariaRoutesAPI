import conn from "../config/conn.js";

const tableEmprestimos = /*sql*/ `
    CREATE TABLE IF NOT EXISTS emprestimos (
        id varchar(60) primary key,
        cliente_id varchar(60),
        livro_id varchar(60),
        data_emprestimo date not null,
        data_devolucao date not null,
        ativo boolean default true,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,

        foreign key (cliente_id) references clientes(cliente_id),
        foreign key (livro_id) references employees(id)
    ); 
`;

conn.query(tableEmprestimos, (err, result, field) => {
  if (err) {
    console.error("erro ao criar a tabela" + err.stack);
    return;
  }
  console.log("Tabela [Emprestimos] criada com sucesso!");
});
