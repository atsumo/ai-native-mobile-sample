import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoProvider, useTodos } from './TodoContext';
import { TodoStatus } from '@/types/todo';

// Wrapper component for testing
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TodoProvider>{children}</TodoProvider>
);

describe('TodoContext', () => {
  let mockDateNow: number;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    // Mock Date.now() to return incrementing values for unique IDs
    mockDateNow = 1000000;
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return mockDateNow++;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('useTodos hook', () => {
    it('should throw error when used outside TodoProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        renderHook(() => useTodos());
      }).toThrow('useTodos must be used within a TodoProvider');

      consoleSpy.mockRestore();
    });

    it('should provide initial empty todos', () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      expect(result.current.todos).toEqual([]);
      expect(result.current.filteredTodos).toEqual([]);
      expect(result.current.filter).toBe('all');
    });
  });

  describe('addTodo', () => {
    it('should add a new todo', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Test Todo');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(1);
        expect(result.current.todos[0].title).toBe('Test Todo');
        expect(result.current.todos[0].status).toBe(TodoStatus.TODO);
      });
    });

    it('should add a todo with description', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Test Todo', 'Test Description');
      });

      await waitFor(() => {
        expect(result.current.todos[0].description).toBe('Test Description');
      });
    });

    it('should save todos to AsyncStorage', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Test Todo');
      });

      await waitFor(() => {
        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });
    });

    it('should add new todo to the beginning of the list', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('First Todo');
        result.current.addTodo('Second Todo');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(2);
        expect(result.current.todos[0].title).toBe('Second Todo');
        expect(result.current.todos[1].title).toBe('First Todo');
      });
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo by id', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      // Add a todo first
      act(() => {
        result.current.addTodo('Test Todo');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(1);
      });

      const todoId = result.current.todos[0].id;

      // Delete the todo
      act(() => {
        result.current.deleteTodo(todoId);
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(0);
      });
    });

    it('should not affect other todos when deleting', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      // Add multiple todos and then delete one
      act(() => {
        result.current.addTodo('First Todo');
        result.current.addTodo('Second Todo');
        result.current.addTodo('Third Todo');
      });

      // Wait for todos and perform deletion in verification
      await waitFor(() => {
        expect(result.current.todos).toHaveLength(3);
      });

      // Get ID and delete
      const secondTodoId = result.current.todos[1].id;

      act(() => {
        result.current.deleteTodo(secondTodoId);
      });

      // Verify deletion
      await waitFor(() => {
        expect(result.current.todos).toHaveLength(2);
        expect(result.current.todos.find(t => t.id === secondTodoId)).toBeUndefined();
      }, { timeout: 3000 });
    });
  });

  describe('updateTodoStatus', () => {
    it('should update todo status', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Test Todo');
      });

      let todoId: string;
      await waitFor(() => {
        expect(result.current.todos).toHaveLength(1);
        todoId = result.current.todos[0].id;
        expect(todoId).toBeDefined();
      });

      act(() => {
        result.current.updateTodoStatus(todoId!, TodoStatus.DONE);
      });

      await waitFor(() => {
        expect(result.current.todos.length).toBeGreaterThan(0);
        expect(result.current.todos[0].status).toBe(TodoStatus.DONE);
      });
    });

    it('should not affect other properties when updating status', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Test Todo', 'Test Description');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(1);
      });

      const todo = result.current.todos[0];

      act(() => {
        result.current.updateTodoStatus(todo.id, TodoStatus.DONE);
      });

      await waitFor(() => {
        expect(result.current.todos[0].title).toBe('Test Todo');
        expect(result.current.todos[0].description).toBe('Test Description');
        expect(result.current.todos[0].id).toBe(todo.id);
      });
    });
  });

  describe('updateTodo', () => {
    it('should update todo title', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Test Todo');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(1);
      });

      const todoId = result.current.todos[0].id;

      act(() => {
        result.current.updateTodo(todoId, { title: 'Updated Title' });
      });

      await waitFor(() => {
        expect(result.current.todos[0].title).toBe('Updated Title');
      });
    });

    it('should update todo description', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Test Todo');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(1);
      });

      const todoId = result.current.todos[0].id;

      act(() => {
        result.current.updateTodo(todoId, { description: 'New Description' });
      });

      await waitFor(() => {
        expect(result.current.todos[0].description).toBe('New Description');
      });
    });

    it('should update todo dueDate', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Test Todo');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(1);
      });

      const todoId = result.current.todos[0].id;
      const dueDate = Date.now();

      act(() => {
        result.current.updateTodo(todoId, { dueDate });
      });

      await waitFor(() => {
        expect(result.current.todos[0].dueDate).toBe(dueDate);
      });
    });

    it('should update multiple properties at once', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Test Todo');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(1);
      });

      const todoId = result.current.todos[0].id;
      const dueDate = Date.now();

      act(() => {
        result.current.updateTodo(todoId, {
          title: 'Updated Title',
          description: 'Updated Description',
          dueDate,
          status: TodoStatus.DONE,
        });
      });

      await waitFor(() => {
        const updatedTodo = result.current.todos[0];
        expect(updatedTodo.title).toBe('Updated Title');
        expect(updatedTodo.description).toBe('Updated Description');
        expect(updatedTodo.dueDate).toBe(dueDate);
        expect(updatedTodo.status).toBe(TodoStatus.DONE);
      });
    });
  });

  describe('filter functionality', () => {
    it('should filter todos by "all"', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Todo 1');
        result.current.addTodo('Todo 2');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(2);
      });

      act(() => {
        result.current.updateTodoStatus(result.current.todos[0].id, TodoStatus.DONE);
        result.current.setFilter('all');
      });

      await waitFor(() => {
        expect(result.current.filteredTodos).toHaveLength(2);
      });
    });

    it('should filter todos by "active"', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Todo 1');
        result.current.addTodo('Todo 2');
        result.current.addTodo('Todo 3');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(3);
      });

      act(() => {
        result.current.updateTodoStatus(result.current.todos[0].id, TodoStatus.DONE);
        result.current.setFilter('active');
      });

      await waitFor(() => {
        expect(result.current.filteredTodos).toHaveLength(2);
        expect(result.current.filteredTodos.every(t => t.status !== TodoStatus.DONE)).toBe(true);
      });
    });

    it('should filter todos by "completed"', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Todo 1');
        result.current.addTodo('Todo 2');
        result.current.addTodo('Todo 3');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(3);
      });

      act(() => {
        result.current.updateTodoStatus(result.current.todos[0].id, TodoStatus.DONE);
        result.current.updateTodoStatus(result.current.todos[1].id, TodoStatus.DONE);
        result.current.setFilter('completed');
      });

      await waitFor(() => {
        expect(result.current.filteredTodos).toHaveLength(2);
        expect(result.current.filteredTodos.every(t => t.status === TodoStatus.DONE)).toBe(true);
      });
    });
  });

  describe('stats', () => {
    it('should calculate stats correctly', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      act(() => {
        result.current.addTodo('Todo 1');
        result.current.addTodo('Todo 2');
        result.current.addTodo('Todo 3');
        result.current.addTodo('Todo 4');
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(4);
      });

      act(() => {
        result.current.updateTodoStatus(result.current.todos[0].id, TodoStatus.DONE);
        result.current.updateTodoStatus(result.current.todos[1].id, TodoStatus.DONE);
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(4);
        expect(result.current.stats.total).toBe(4);
        expect(result.current.stats.todo).toBe(2);
        expect(result.current.stats.done).toBe(2);
      });
    });

    it('should update stats when todos change', async () => {
      const { result } = renderHook(() => useTodos(), { wrapper });

      // Wait for initial load to complete
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      expect(result.current.stats.total).toBe(0);

      act(() => {
        result.current.addTodo('Todo 1');
      });

      await waitFor(() => {
        expect(result.current.stats.total).toBe(1);
        expect(result.current.stats.todo).toBe(1);
        expect(result.current.stats.done).toBe(0);
      });

      act(() => {
        result.current.updateTodoStatus(result.current.todos[0].id, TodoStatus.DONE);
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(1);
        expect(result.current.stats.todo).toBe(0);
        expect(result.current.stats.done).toBe(1);
      });

      act(() => {
        result.current.deleteTodo(result.current.todos[0].id);
      });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(0);
        expect(result.current.stats.total).toBe(0);
        expect(result.current.stats.done).toBe(0);
      });
    });
  });

  describe('persistence with AsyncStorage', () => {
    it('should load todos from AsyncStorage on mount', async () => {
      const mockTodos = [
        {
          id: '1',
          title: 'Saved Todo',
          status: TodoStatus.TODO,
          createdAt: Date.now(),
        },
      ];

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockTodos));

      const { result } = renderHook(() => useTodos(), { wrapper });

      await waitFor(() => {
        expect(result.current.todos).toHaveLength(1);
        expect(result.current.todos[0].title).toBe('Saved Todo');
      });
    });

    it('should handle AsyncStorage errors gracefully', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      const { result } = renderHook(() => useTodos(), { wrapper });

      // Should not throw and should have empty todos
      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });
    });
  });
});
