import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageUtils } from './storage';
import { Todo, TodoStatus } from '@/types/todo';

describe('storageUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should return empty array when no todos are stored', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const todos = await storageUtils.getTodos();

      expect(todos).toEqual([]);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('@todos');
    });

    it('should return parsed todos from storage', async () => {
      const mockTodos: Todo[] = [
        {
          id: '1',
          title: 'Test Todo',
          status: TodoStatus.TODO,
          createdAt: Date.now(),
        },
      ];

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockTodos));

      const todos = await storageUtils.getTodos();

      expect(todos).toEqual(mockTodos);
    });

    it('should handle JSON parse errors and return empty array', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('invalid json');

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const todos = await storageUtils.getTodos();

      expect(todos).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load todos:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should handle AsyncStorage errors and return empty array', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const todos = await storageUtils.getTodos();

      expect(todos).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load todos:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('saveTodos', () => {
    it('should save todos to AsyncStorage', async () => {
      const mockTodos: Todo[] = [
        {
          id: '1',
          title: 'Test Todo',
          status: TodoStatus.TODO,
          createdAt: Date.now(),
        },
      ];

      await storageUtils.saveTodos(mockTodos);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@todos',
        JSON.stringify(mockTodos)
      );
    });

    it('should save empty array', async () => {
      await storageUtils.saveTodos([]);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@todos', '[]');
    });

    it('should handle AsyncStorage errors gracefully', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await storageUtils.saveTodos([]);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to save todos:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should save todos with all properties', async () => {
      const mockTodos: Todo[] = [
        {
          id: '1',
          title: 'Test Todo',
          description: 'Test Description',
          status: TodoStatus.DONE,
          createdAt: 1234567890,
          dueDate: 9876543210,
        },
      ];

      await storageUtils.saveTodos(mockTodos);

      const savedData = (AsyncStorage.setItem as jest.Mock).mock.calls[0][1];
      const parsedData = JSON.parse(savedData);

      expect(parsedData).toEqual(mockTodos);
      expect(parsedData[0].description).toBe('Test Description');
      expect(parsedData[0].dueDate).toBe(9876543210);
    });
  });

  describe('clearTodos', () => {
    it('should remove todos from AsyncStorage', async () => {
      await storageUtils.clearTodos();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@todos');
    });

    it('should handle AsyncStorage errors gracefully', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(new Error('Storage error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await storageUtils.clearTodos();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to clear todos:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});
