import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../components/FilterBar';

test('переключает фильтр по клику', () => {
  const onChange = vi.fn();
  render(<FilterBar current="all" onChange={onChange} />);
  fireEvent.click(screen.getByText('Активные'));
  expect(onChange).toHaveBeenCalledWith('active');
});