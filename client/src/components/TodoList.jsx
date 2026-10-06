import TodoItem from './TodoItem';

export default function TodoList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) return <p>Задач нет</p>;
  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}