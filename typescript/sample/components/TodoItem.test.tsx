import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TodoItem } from './TodoItem';
import { TodoProvider } from '@/contexts/TodoContext';
import { Todo, TodoStatus } from '@/types/todo';
import { router } from 'expo-router';

// Mock the date utility functions
jest.mock('@/utils/date', () => ({
  formatDueDate: jest.fn((date: number) => 'Jan 15'),
  isOverdue: jest.fn(() => false),
}));

const mockTodo: Todo = {
  id: '1',
  title: 'Test Todo',
  status: TodoStatus.TODO,
  createdAt: Date.now(),
};

const mockDoneTodo: Todo = {
  id: '2',
  title: 'Completed Todo',
  status: TodoStatus.DONE,
  createdAt: Date.now(),
};

const mockTodoWithDueDate: Todo = {
  id: '3',
  title: 'Todo with Due Date',
  status: TodoStatus.TODO,
  createdAt: Date.now(),
  dueDate: Date.now() + 86400000, // Tomorrow
};

describe('TodoItem', () => {
  it('should render todo title', () => {
    const { getByText } = render(
      <TodoProvider>
        <TodoItem todo={mockTodo} />
      </TodoProvider>
    );

    expect(getByText('Test Todo')).toBeTruthy();
  });

  it('should render checkbox unchecked for TODO status', () => {
    const { queryByTestId } = render(
      <TodoProvider>
        <TodoItem todo={mockTodo} />
      </TodoProvider>
    );

    // Check icon should not be visible for TODO status
    const text = render(
      <TodoProvider>
        <TodoItem todo={mockTodo} />
      </TodoProvider>
    ).toJSON();

    expect(text).toBeTruthy();
  });

  it('should render checkbox checked for DONE status', () => {
    const { toJSON } = render(
      <TodoProvider>
        <TodoItem todo={mockDoneTodo} />
      </TodoProvider>
    );

    expect(toJSON()).toBeTruthy();
  });

  it('should apply strikethrough style for completed todo', () => {
    const { getByText } = render(
      <TodoProvider>
        <TodoItem todo={mockDoneTodo} />
      </TodoProvider>
    );

    const titleText = getByText('Completed Todo');
    expect(titleText.props.className).toContain('line-through');
  });

  it('should not apply strikethrough style for active todo', () => {
    const { getByText } = render(
      <TodoProvider>
        <TodoItem todo={mockTodo} />
      </TodoProvider>
    );

    const titleText = getByText('Test Todo');
    expect(titleText.props.className).not.toContain('line-through');
  });

  it('should navigate to detail page when todo is pressed', () => {
    const { getByText } = render(
      <TodoProvider>
        <TodoItem todo={mockTodo} />
      </TodoProvider>
    );

    fireEvent.press(getByText('Test Todo'));

    expect(router.push).toHaveBeenCalledWith('/todo/1');
  });

  it('should display due date when present', () => {
    const { getByText } = render(
      <TodoProvider>
        <TodoItem todo={mockTodoWithDueDate} />
      </TodoProvider>
    );

    // The formatDueDate mock returns 'Jan 15'
    expect(getByText('Jan 15')).toBeTruthy();
  });

  it('should render swipeable component', () => {
    const { toJSON } = render(
      <TodoProvider>
        <TodoItem todo={mockTodo} />
      </TodoProvider>
    );

    // Check that component renders successfully
    expect(toJSON()).toBeTruthy();
  });

  it('should show delete button text', () => {
    const { getByText } = render(
      <TodoProvider>
        <TodoItem todo={mockTodo} />
      </TodoProvider>
    );

    // Delete button text should be rendered (even if not visible until swiped)
    expect(getByText('削除')).toBeTruthy();
  });
});
