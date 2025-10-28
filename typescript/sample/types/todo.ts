export enum TodoStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt: number;
  description?: string;
  dueDate?: number;
}

export type FilterType = 'all' | 'active' | 'completed';
