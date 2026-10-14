export default function TodoItem({ task, busy = false, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          disabled={busy}
          onChange={() => onToggle(task.id)}
        />
        <span className="todo-text">{task.text}</span>
      </label>
      <button
        type="button"
        className="delete-btn"
        disabled={busy}
        aria-label={`Удалить задачу: ${task.text}`}
        onClick={() => onDelete(task.id)}
      >
        ✕
      </button>
    </li>
  );
}