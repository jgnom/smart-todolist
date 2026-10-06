import TodoForm from './components/TodoForm';
import { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const handleAdd = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const handleToggle = (id) => {
  setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
  setTasks(tasks.filter(t => t.id !== id));
  };
    return (
      <div className="app">
        <h1>Smart TodoList</h1>
        <TodoForm onAdd={handleAdd} />
      </div>
    );
  }