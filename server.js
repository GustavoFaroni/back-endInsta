// Importa o framework Express para criar aplicações web
import express from "express";
import routes from "./src/routes/postRoutes.js";


// Cria uma instância da aplicação Express
const app = express();
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000 e registra uma mensagem no console
app.listen(3000, () => {
  console.log("servidor escutando");
});