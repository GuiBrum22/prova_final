import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewTask() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    priority: 'baixa',
    status: 'a_fazer',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    router.push('/');
  };

  return (
    <main>
      <h1>Nova Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>Descrição</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Setor</label>
        <input name="department" value={formData.department} onChange={handleChange} />

        <label>Prioridade</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>

        <button type="submit">Salvar</button>
      </form>
    </main>
  );
}
