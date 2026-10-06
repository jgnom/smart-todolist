import TodoForm from './components/TodoForm';
import { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const handleAdd = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  return (
    <div className="app">
      <h1>Smart TodoList</h1>
      <TodoForm onAdd={handleAdd} />
    </div>
  );
}