import React, { createContext, useContext, useEffect, useState } from 'react';
import { Todo, TodoStatus, FilterType } from '@/types/todo';
import { storageUtils } from '@/utils/storage';

interface TodoContextType {
  todos: Todo[];
  filter: FilterType;
  addTodo: (title: string, description?: string) => void;
  deleteTodo: (id: string) => void;
  updateTodoStatus: (id: string, status: TodoStatus) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  setFilter: (filter: FilterType) => void;
  filteredTodos: Todo[];
  stats: {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
  };
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Load todos from storage on mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos to storage whenever they change
  useEffect(() => {
    if (todos.length > 0 || todos.length === 0) {
      storageUtils.saveTodos(todos);
    }
  }, [todos]);

  const loadTodos = async () => {
    const loadedTodos = await storageUtils.getTodos();
    setTodos(loadedTodos);
  };

  const addTodo = (title: string, description?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      status: TodoStatus.TODO,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodoStatus = (id: string, status: TodoStatus) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return todo.status !== TodoStatus.DONE;
    if (filter === 'completed') return todo.status === TodoStatus.DONE;
    return true;
  });

  const stats = {
    total: todos.length,
    todo: todos.filter((t) => t.status === TodoStatus.TODO).length,
    inProgress: todos.filter((t) => t.status === TodoStatus.IN_PROGRESS).length,
    done: todos.filter((t) => t.status === TodoStatus.DONE).length,
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        addTodo,
        deleteTodo,
        updateTodoStatus,
        updateTodo,
        setFilter,
        filteredTodos,
        stats,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
