// Imports
import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";

// Criando o servidor com express
const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota padrão
app.get("/", (request: Request, response: Response) => {
  response.status(200).json({ mensagem: "Api Ok!" });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log("Servidor rodando na porta", port, "🚀");
});