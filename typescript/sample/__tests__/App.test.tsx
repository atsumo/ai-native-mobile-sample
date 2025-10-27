import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import App from '../src/App';

describe('Todo App', () => {
  it('renders correctly', () => {
    const {getByText} = render(<App />);
    expect(getByText('Todo List')).toBeTruthy();
    expect(getByText('No todos yet. Add one above!')).toBeTruthy();
  });

  it('can add a new todo', () => {
    const {getByTestId, getByText} = render(<App />);

    const input = getByTestId('todo-input');
    const addButton = getByTestId('add-button');

    fireEvent.changeText(input, 'Test Todo Item');
    fireEvent.press(addButton);

    expect(getByText('Test Todo Item')).toBeTruthy();
  });

  it('can toggle todo completion', () => {
    const {getByTestId, getByText} = render(<App />);

    const input = getByTestId('todo-input');
    const addButton = getByTestId('add-button');

    // Add a todo
    fireEvent.changeText(input, 'Test Todo');
    fireEvent.press(addButton);

    const todoText = getByText('Test Todo');
    expect(todoText.props.style).not.toContainEqual(
      expect.objectContaining({textDecorationLine: 'line-through'}),
    );

    // Get the checkbox (we need to find it dynamically)
    const checkboxes = getByTestId(/checkbox-/);
    fireEvent.press(checkboxes);

    // After toggling, the text should have line-through style
    expect(todoText.props.style).toContainEqual(
      expect.objectContaining({textDecorationLine: 'line-through'}),
    );
  });

  it('can delete a todo', () => {
    const {getByTestId, getByText, queryByText} = render(<App />);

    const input = getByTestId('todo-input');
    const addButton = getByTestId('add-button');

    // Add a todo
    fireEvent.changeText(input, 'Todo to Delete');
    fireEvent.press(addButton);

    expect(getByText('Todo to Delete')).toBeTruthy();

    // Delete the todo
    const deleteButton = getByTestId(/delete-/);
    fireEvent.press(deleteButton);

    expect(queryByText('Todo to Delete')).toBeNull();
  });

  it('does not add empty todos', () => {
    const {getByTestId, getByText} = render(<App />);

    const addButton = getByTestId('add-button');

    // Try to add without text
    fireEvent.press(addButton);

    // Empty state message should still be visible
    expect(getByText('No todos yet. Add one above!')).toBeTruthy();
  });

  it('clears input after adding todo', () => {
    const {getByTestId} = render(<App />);

    const input = getByTestId('todo-input');
    const addButton = getByTestId('add-button');

    fireEvent.changeText(input, 'Test Todo');
    fireEvent.press(addButton);

    expect(input.props.value).toBe('');
  });
});
