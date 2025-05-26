import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from './TodoApp';

test('renders todo app', () => {
  render(<TodoApp />);
  expect(screen.getByText('📝 To-Do List')).toBeInTheDocument();
});

test('adds a new task', () => {
  render(<TodoApp />);
  const input = screen.getByPlaceholderText('Enter a new task...');
  const addButton = screen.getByText('Add');
  
  fireEvent.change(input, { target: { value: 'Test task' } });
  fireEvent.click(addButton);
  
  expect(screen.getByText('Test task')).toBeInTheDocument();
});

test('validates empty input', () => {
  render(<TodoApp />);
  const addButton = screen.getByText('Add');
  
  fireEvent.click(addButton);
  
  expect(screen.getByText('Task cannot be empty')).toBeInTheDocument();
});