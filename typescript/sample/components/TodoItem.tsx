import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Todo, TodoStatus } from '@/types/todo';
import { useTodos } from '@/contexts/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { updateTodoStatus, deleteTodo } = useTodos();

  const cycleStatus = () => {
    if (todo.status === TodoStatus.TODO) {
      updateTodoStatus(todo.id, TodoStatus.IN_PROGRESS);
    } else if (todo.status === TodoStatus.IN_PROGRESS) {
      updateTodoStatus(todo.id, TodoStatus.DONE);
    } else {
      updateTodoStatus(todo.id, TodoStatus.TODO);
    }
  };

  const getStatusLabel = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.TODO:
        return null;
      case TodoStatus.IN_PROGRESS:
        return '進行中';
      case TodoStatus.DONE:
        return null;
      default:
        return null;
    }
  };

  const renderRightActions = () => (
    <TouchableOpacity
      className="bg-accent-red justify-center items-end px-6 rounded-r-xl"
      onPress={() => deleteTodo(todo.id)}
    >
      <Text className="text-white text-base font-semibold">削除</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        className="flex-row items-center mx-4 mb-2 px-4 py-3 gap-3 bg-white dark:bg-natural-800 rounded-xl"
        onPress={cycleStatus}
        activeOpacity={0.9}
      >
        <View
          className={`w-5 h-5 rounded-full border-2 justify-center items-center ${
            todo.status === TodoStatus.DONE
              ? 'bg-primary border-primary'
              : todo.status === TodoStatus.IN_PROGRESS
              ? 'border-accent-orange'
              : 'border-natural-300 dark:border-natural-600'
          }`}
        >
          {todo.status === TodoStatus.DONE && (
            <Text className="text-white text-xs font-bold">✓</Text>
          )}
          {todo.status === TodoStatus.IN_PROGRESS && (
            <View className="w-2 h-2 rounded-full bg-accent-orange" />
          )}
        </View>
        <View className="flex-1">
          <Text
            className={`text-base font-normal ${
              todo.status === TodoStatus.DONE
                ? 'line-through text-natural-400 dark:text-natural-600'
                : 'text-natural-900 dark:text-natural-50'
            }`}
          >
            {todo.title}
          </Text>
          {getStatusLabel(todo.status) && (
            <Text className="text-xs text-accent-orange font-medium mt-1">
              {getStatusLabel(todo.status)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}
