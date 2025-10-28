import { formatDueDate, isOverdue } from './date';
import { TodoStatus } from '@/types/todo';

describe('date utils', () => {
  describe('formatDueDate', () => {
    beforeEach(() => {
      // Mock the current date to 2024-01-15 12:00:00 local time
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should format today date correctly', () => {
      // Get the mocked "now" and create a date for "today" at a different time
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30, 0);
      const result = formatDueDate(today.getTime());

      expect(result).toContain('Today');
    });

    it('should format tomorrow date correctly', () => {
      // Get the mocked "now" and create a date for "tomorrow"
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0, 0);
      const result = formatDueDate(tomorrow.getTime());

      expect(result).toContain('Tomorrow');
    });

    it('should format future dates correctly', () => {
      // Create a date far in the future
      const now = new Date();
      const futureDate = new Date(now.getFullYear(), now.getMonth() + 1, 20, 10, 0, 0);
      const result = formatDueDate(futureDate.getTime());

      // Should return month and day format like "Feb 20"
      expect(result).toMatch(/[A-Za-z]+\s+\d+/);
    });

    it('should include time for today', () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30, 0);
      const result = formatDueDate(today.getTime());

      // Should include time in 12-hour format
      expect(result).toMatch(/\d{1,2}:\d{2}\s*(AM|PM)/i);
    });

    it('should include time for tomorrow', () => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0, 0);
      const result = formatDueDate(tomorrow.getTime());

      // Should include time in 12-hour format
      expect(result).toMatch(/\d{1,2}:\d{2}\s*(AM|PM)/i);
    });
  });

  describe('isOverdue', () => {
    beforeEach(() => {
      // Mock the current date to 2024-01-15 12:00:00 local time
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2024, 0, 15, 12, 0, 0));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return true for past date with TODO status', () => {
      // Create a date 5 days in the past
      const now = new Date();
      const pastDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 10, 0, 0).getTime();

      expect(isOverdue(pastDate, TodoStatus.TODO)).toBe(true);
    });

    it('should return false for past date with DONE status', () => {
      // Create a date 5 days in the past
      const now = new Date();
      const pastDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5, 10, 0, 0).getTime();

      expect(isOverdue(pastDate, TodoStatus.DONE)).toBe(false);
    });

    it('should return false for future date with TODO status', () => {
      // Create a date 5 days in the future
      const now = new Date();
      const futureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 10, 0, 0).getTime();

      expect(isOverdue(futureDate, TodoStatus.TODO)).toBe(false);
    });

    it('should return false for future date with DONE status', () => {
      // Create a date 5 days in the future
      const now = new Date();
      const futureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 10, 0, 0).getTime();

      expect(isOverdue(futureDate, TodoStatus.DONE)).toBe(false);
    });

    it('should return false for current time with TODO status', () => {
      const now = Date.now();

      // Current time should not be overdue
      expect(isOverdue(now, TodoStatus.TODO)).toBe(false);
    });

    it('should return true for one millisecond in the past with TODO status', () => {
      const oneMillisecondAgo = Date.now() - 1;

      expect(isOverdue(oneMillisecondAgo, TodoStatus.TODO)).toBe(true);
    });
  });
});
