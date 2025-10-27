import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '@/types/todo';

const TODOS_STORAGE_KEY = '@todos';

export const storageUtils = {
  async getTodos(): Promise<Todo[]> {
    try {
      const todosJson = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
      return todosJson ? JSON.parse(todosJson) : [];
    } catch (error) {
      console.error('Failed to load todos:', error);
      return [];
    }
  },

  async saveTodos(todos: Todo[]): Promise<void> {
    try {
      await AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos:', error);
    }
  },

  async clearTodos(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TODOS_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear todos:', error);
    }
  },
};
