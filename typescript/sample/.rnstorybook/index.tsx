import { view } from './storybook.requires';

// Simple in-memory storage mock for Storybook
const inMemoryStorage: { [key: string]: string } = {};

const mockStorage = {
  getItem: async (key: string) => {
    return inMemoryStorage[key] || null;
  },
  setItem: async (key: string, value: string) => {
    inMemoryStorage[key] = value;
  },
};

const StorybookUI = view.getStorybookUI({
  shouldPersistSelection: false,
  storage: mockStorage,
});

export default StorybookUI;
