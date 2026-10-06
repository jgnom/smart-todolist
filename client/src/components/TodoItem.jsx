export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.text}</span>
      </label>
      <button onClick={() => onDelete(task.id)}>✕</button>
    </li>
  );
}