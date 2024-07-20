import "dotenv/config"
import express from "express"
import conn from "./config/conn.js"
import "./models/livroModel.js"
const PORT = process.env.PORT

const app = express()

app.get('/', (request, response)=>{
    response.send("Olá, Mundo!")
})

app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta: "+PORT)
})