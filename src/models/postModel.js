import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"

// Estabelece uma conexão com o banco de dados usando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Define uma função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados 'insta-teste'
    const db = conexao.db("insta-teste");
    // Seleciona a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
  }

export async function newPost(novoPost) {
    const db = conexao.db("insta-teste");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
    
}

export async function atualizarPost(id , novoPost) {
  const db = conexao.db("insta-teste");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id)
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost})
  
}