const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Conexão com o banco de dados
const router = express.Router();

const JWT_SECRET = 'sua_chave_secreta_segura_aqui'; // Substitua por uma chave segura

// Rota para login de usuário
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o email existe
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];

    // Verifica se o usuário não existe ou se a senha está incorreta
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera o token JWT com o ID do usuário
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
