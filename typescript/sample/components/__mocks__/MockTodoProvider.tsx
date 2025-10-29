import React, { createContext, useContext } from 'react';
import { Todo, TodoStatus } from '@/types/todo';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  updateTodoStatus: (id: string, status: TodoStatus) => void;
  deleteTodo: (id: string) => void;
}

const MockTodoContext = createContext<TodoContextType | undefined>(undefined);

export function MockTodoProvider({ children }: { children: React.ReactNode }) {
  const mockContextValue: TodoContextType = {
    todos: [],
    addTodo: () => console.log('Mock addTodo called'),
    updateTodo: () => console.log('Mock updateTodo called'),
    updateTodoStatus: () => console.log('Mock updateTodoStatus called'),
    deleteTodo: () => console.log('Mock deleteTodo called'),
  };

  return (
    <MockTodoContext.Provider value={mockContextValue}>
      {children}
    </MockTodoContext.Provider>
  );
}

export function useMockTodos() {
  const context = useContext(MockTodoContext);
  if (context === undefined) {
    throw new Error('useMockTodos must be used within a MockTodoProvider');
  }
  return context;
}
