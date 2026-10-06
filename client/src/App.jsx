import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/todoApi';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAdd = async (text) => {
    try {
      const newTask = await createTask(text);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const updated = await updateTask(id, { completed: !completed });
      setTasks(tasks.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Smart TodoList</h1>
      {error && <div className="error">{error}</div>}
      <TodoForm onAdd={handleAdd} />
      <FilterBar current={filter} onChange={setFilter} />
      <TodoList tasks={filtered} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}