import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { TodoInput } from './TodoInput';

const meta = {
  title: 'TodoInput',
  component: TodoInput,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: 'white' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TodoInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
