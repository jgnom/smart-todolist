import { useState, useEffect, useCallback } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/todoApi';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setLoadError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAdd = async (text) => {
    setError(null);
    setSubmitting(true);
    try {
      const newTask = await createTask(text);
      setTasks((prev) => [...prev, newTask]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id) => {
    setError(null);
    setBusyId(id);
    try {
      const current = tasks.find((t) => t.id === id);
      if (!current) return;
      const updated = await updateTask(id, { completed: !current.completed });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    setError(null);
    setBusyId(id);
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const filtered = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Smart TodoList</h1>

      {error && (
        <div className="error-banner" role="alert">
          <span>⚠️ {error}</span>
          <button type="button" onClick={() => setError(null)}>
            Скрыть
          </button>
        </div>
      )}

      <TodoForm onAdd={handleAdd} pending={submitting} />
      <FilterBar current={filter} onChange={setFilter} />

      {loading ? (
        <p className="loading" role="status">Загрузка…</p>
      ) : loadError ? (
        <div className="load-error" role="alert">
          <p>Не удалось загрузить задачи: {loadError}</p>
          <button type="button" className="retry-btn" onClick={loadTasks}>
            Повторить
          </button>
        </div>
      ) : (
        <TodoList
          tasks={filtered}
          busyId={busyId}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}