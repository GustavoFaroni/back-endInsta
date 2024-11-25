// Importa o framework Express para criar aplicações web
import express from "express";

// Importa o módulo multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções controladoras para posts vindas de outro arquivo
import { criarPost, listarPosts, uploadImagem, atualizarNovoPost } from "../controllers/postController.js";

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionSuccessStatus: 200
}

// Configura o armazenamento de arquivos para o multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório para salvar os arquivos enviados (no caso, 'uploads/')
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo como o nome original enviado
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define uma função para configuração de rotas
const routes = (app) => {
  // Habilita o parsing de JSON para requisições recebidas
  app.use(express.json());

  app.use(cors(corsOptions))

  // Define uma rota GET para listar posts (manipulada pela função 'listarPosts')
  app.get("/posts", listarPosts);

  // Define uma rota POST para criar posts (manipulada pela função 'criarPost')
  app.post("/posts", criarPost);

  // Define uma rota POST para upload de imagem (usa o middleware 'upload.single("imagem")' e depois a função 'uploadImagem')
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost )
};

// Exporta a função 'routes' para ser usada em outro arquivo
export default routes;