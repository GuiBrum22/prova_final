const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // Conexão com o banco de dados
const router = express.Router();

// Rota para registro de usuário
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Gera um hash da senha para armazenamento seguro
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insere o novo usuário no banco de dados
    await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)',
      [username, email, passwordHash]
    );

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

module.exports = router;
