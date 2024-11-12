import styles from '../styles/page.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Erro ao carregar tarefas:', error));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/tasks`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await fetch(`/api/tasks`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  const renderColumn = (status, title) => (
    <div className={styles.column}>
      <h2>{title}</h2>
      {tasks.filter(task => task.status === status).map(task => (
        <div key={task.id} className={styles['task-card']}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Setor: {task.department}</p>
          <p>Prioridade: {task.priority}</p>
          <div className={styles['task-actions']}>
            <button onClick={() => handleUpdateStatus(task.id, status === 'a_fazer' ? 'fazendo' : 'pronto')}>Alterar Status</button>
            <button onClick={() => handleDelete(task.id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className={styles.main}>
      <h1>Gerenciamento de Tarefas</h1>
      <div className={styles['kanban-board']}>
        {renderColumn('a_fazer', 'A Fazer')}
        {renderColumn('fazendo', 'Fazendo')}
        {renderColumn('pronto', 'Pronto')}
      </div>
    </main>
  );
}
