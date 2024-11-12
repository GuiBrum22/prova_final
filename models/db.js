// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Substitua pelo URI do seu MongoDB
const client = new MongoClient(uri);

let db;

async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db('prova_final'); // Substitua pelo nome do seu banco de dados
  }
  return db;
}

module.exports = connectToDB;
