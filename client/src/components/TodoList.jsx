import TodoItem from './TodoItem';

export default function TodoList({ tasks, busyId = null, onToggle, onDelete }) {
  if (tasks.length === 0) return <p className="empty">Задач нет</p>;

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          busy={busyId === task.id}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}