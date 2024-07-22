import conn from "../config/conn.js";

const tableCliente = /*sql*/ `
    CREATE TABLE IF NOT EXISTS clientes (
        cliente_id varchar(60) primary key,
        name_cliente varchar(255) not null,
        email varchar(400) not null,
        senha varchar(255) not null,
        imagem varchar(3000) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    ); 
`;

conn.query(tableCliente, (err, result, field) => {
  if (err) {
    console.error("erro ao criar a tabela" + err.stack);
    return;
  }
  console.log("Tabela [Clientes] criada com sucesso!");
});
