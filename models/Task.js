// models/Task.js
import pool from './db';

// Função para obter todas as tarefas
export const getAllTasks = async () => {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
};

// Função para obter uma tarefa por ID
export const getTaskById = async (id) => {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return result.rows[0];
};

// Função para criar uma nova tarefa
export const createTask = async (taskData) => {
  const { title, description, department, priority, status, user_id } = taskData;
  const result = await pool.query(
    'INSERT INTO tasks (title, description, department, priority, status, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [title, description, department, priority, status, user_id]
  );
  return result.rows[0];
};

// Função para atualizar uma tarefa
export const updateTask = async (id, taskData) => {
  const { title, description, department, priority, status, user_id } = taskData;
  const result = await pool.query(
    'UPDATE tasks SET title = $1, description = $2, department = $3, priority = $4, status = $5, user_id = $6 WHERE id = $7 RETURNING *',
    [title, description, department, priority, status, user_id, id]
  );
  return result.rows[0];
};

// Função para excluir uma tarefa
export const deleteTask = async (id) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
};

// Função para atualizar o status de uma tarefa
export const updateTaskStatus = async (id, status) => {
  const result = await pool.query(
    'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};
