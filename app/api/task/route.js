// api/tasks/route.js
import { getAllTasks, createTask, updateTask, deleteTask, updateTaskStatus } from '../../models/Task';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const tasks = await getAllTasks();
      res.status(200).json(tasks);
      break;
    case 'POST':
      const newTask = await createTask(req.body);
      res.status(201).json(newTask);
      break;
    case 'PUT':
      const updatedTask = await updateTask(req.body.id, req.body);
      res.status(200).json(updatedTask);
      break;
    case 'DELETE':
      await deleteTask(req.body.id);
      res.status(204).end();
      break;
    case 'PATCH': // Para atualizar o status
      const updatedStatusTask = await updateTaskStatus(req.body.id, req.body.status);
      res.status(200).json(updatedStatusTask);
      break;
    default:
      res.status(405).end();
  }
}
