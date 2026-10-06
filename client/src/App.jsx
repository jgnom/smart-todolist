import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleAdd = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Smart TodoList</h1>
      <TodoForm onAdd={handleAdd} />
      <FilterBar current={filter} onChange={setFilter} />
      <TodoList
        tasks={filtered}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}