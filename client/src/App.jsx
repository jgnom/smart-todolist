import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/todoApi';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (text) => {
    setError(null);
    try {
      const newTask = await createTask(text);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id) => {
    setError(null);
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    try {
      const updated = await updateTask(id, { completed: !task.completed });
      setTasks(tasks.map(t => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    setError(null);
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

      {error && <div className="error-banner">⚠️ {error}</div>}

      <TodoForm onAdd={handleAdd} />
      <FilterBar current={filter} onChange={setFilter} />

      {loading ? (
        <p className="loading">Загрузка...</p>
      ) : (
        <TodoList
          tasks={filtered}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}