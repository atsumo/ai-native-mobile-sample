import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TodoItem } from './TodoItem';
import { TodoStatus } from '@/types/todo';

const meta = {
  title: 'TodoItem',
  component: TodoItem,
  decorators: [
    (Story) => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ padding: 16, backgroundColor: 'white' }}>
          <Story />
        </View>
      </GestureHandlerRootView>
    ),
  ],
} satisfies Meta<typeof TodoItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Todo: Story = {
  args: {
    todo: {
      id: '1',
      title: 'Buy groceries',
      status: TodoStatus.TODO,
      createdAt: new Date().toISOString(),
    },
  },
};

export const Done: Story = {
  args: {
    todo: {
      id: '2',
      title: 'Complete project documentation',
      status: TodoStatus.DONE,
      createdAt: new Date().toISOString(),
    },
  },
};

export const WithDueDate: Story = {
  args: {
    todo: {
      id: '3',
      title: 'Review pull request',
      status: TodoStatus.TODO,
      dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      createdAt: new Date().toISOString(),
    },
  },
};

export const Overdue: Story = {
  args: {
    todo: {
      id: '4',
      title: 'Submit tax documents',
      status: TodoStatus.TODO,
      dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      createdAt: new Date().toISOString(),
    },
  },
};

export const WithDescription: Story = {
  args: {
    todo: {
      id: '5',
      title: 'Prepare presentation',
      description: 'Need to create slides for the quarterly review meeting',
      status: TodoStatus.TODO,
      createdAt: new Date().toISOString(),
    },
  },
};
