import "dotenv/config"
import mysql from "mysql2"

const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
})

conn.connect((err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log("Banco conectado")
})

export default conn;