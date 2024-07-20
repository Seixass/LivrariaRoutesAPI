import conn from "../config/conn.js"

const tableEmployees = /*sql*/`
    CREATE TABLE IF NOT EXISTS employees (
        id varchar(60) primary key,
        name_employee varchar(255) not null,
        sobrenome_employee varchar(255) not null,
        idade int not null,
        data_contratacao date not null,
        email_employee varchar(400) not null,
        salario float not null,
        meta_vendas int not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    ); 
`;

conn.query(tableEmployees, (err, result, field)=>{
    if(err){
        console.error("erro ao criar a tabela"+err.stack)
        return
    }
    console.log("Tabela [Employees] criada com sucesso!")
})