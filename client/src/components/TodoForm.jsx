import { useState } from 'react';

const MAX_LENGTH = 200;

export default function TodoForm({ onAdd, pending = false }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value || pending) return;

    const ok = await onAdd(value);
    if (ok !== false) setText('');
  };

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          value={text}
          maxLength={MAX_LENGTH}
          disabled={pending}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите задачу..."
          aria-label="Текст задачи"
        />
        <button type="submit" disabled={pending || text.trim().length === 0}>
          {pending ? 'Добавление…' : 'Добавить'}
        </button>
      </form>
      <p className="char-counter">
        {text.length}/{MAX_LENGTH}
      </p>
    </>
  );
}