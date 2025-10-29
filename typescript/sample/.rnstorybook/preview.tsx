import type { Preview } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { TodoProvider } from '../contexts/TodoContext';

const preview: Preview = {
  decorators: [
    (Story) => (
      <TodoProvider>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Story />
        </View>
      </TodoProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'plain',
      values: [
        { name: 'plain', value: 'white' },
        { name: 'warm', value: 'hotpink' },
        { name: 'cool', value: 'deepskyblue' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = preview.decorators;
export const parameters = preview.parameters;

export default preview;
