import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from '../components/TodoForm';

describe('TodoForm', () => {
  test('рендерит поле ввода и кнопку', () => {
    render(<TodoForm onAdd={() => {}} />);
    expect(screen.getByPlaceholderText('Введите задачу...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Добавить' })).toBeInTheDocument();
  });

  test('вызывает onAdd при отправке', () => {
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);
    fireEvent.change(screen.getByPlaceholderText('Введите задачу...'), {
      target: { value: 'Тест' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Добавить' }));
    expect(onAdd).toHaveBeenCalledWith('Тест');
  });

  test('не вызывает onAdd при пустом вводе', () => {
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);
    fireEvent.click(screen.getByRole('button', { name: 'Добавить' }));
    expect(onAdd).not.toHaveBeenCalled();
  });
});