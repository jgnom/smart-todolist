import { render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';

const mockTasks = [
  { id: 1, text: 'Задача 1', completed: false },
  { id: 2, text: 'Задача 2', completed: true },
];

test('отображает список задач', () => {
  render(<TodoList tasks={mockTasks} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText('Задача 1')).toBeInTheDocument();
  expect(screen.getByText('Задача 2')).toBeInTheDocument();
});

test('показывает сообщение при пустом списке', () => {
  render(<TodoList tasks={[]} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText('Задач нет')).toBeInTheDocument();
});