import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { router } from 'expo-router';
import { Todo, TodoStatus } from '@/types/todo';
import { useTodos } from '@/contexts/TodoContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { formatDueDate, isOverdue } from '@/utils/date';

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
      className="bg-accent-red justify-center items-end px-6"
      onPress={() => deleteTodo(todo.id)}
    >
      <Text className="text-white text-base font-medium">削除</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View className="flex-row items-start px-6 py-4 gap-3 bg-white dark:bg-natural-800">
        <TouchableOpacity onPress={cycleStatus} className="pt-0.5">
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
              <FontAwesome name="check" size={10} color="white" />
            )}
            {todo.status === TodoStatus.IN_PROGRESS && (
              <View className="w-2 h-2 rounded-full bg-accent-orange" />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1"
          onPress={() => router.push(`/todo/${todo.id}`)}
          activeOpacity={0.7}
        >
          <View className="flex-1">
            <Text
              className={`text-base font-normal leading-5 ${
                todo.status === TodoStatus.DONE
                  ? 'line-through text-natural-400 dark:text-natural-600'
                  : 'text-natural-900 dark:text-natural-50'
              }`}
            >
              {todo.title}
            </Text>
            {(getStatusLabel(todo.status) || todo.dueDate) && (
              <View className="flex-row items-center gap-3 mt-1">
                {getStatusLabel(todo.status) && (
                  <View className="flex-row items-center gap-1">
                    <FontAwesome name="clock-o" size={11} color="#6E6E6B" />
                    <Text className="text-xs text-natural-500 font-normal">
                      {getStatusLabel(todo.status)}
                    </Text>
                  </View>
                )}
                {todo.dueDate && (
                  <View className="flex-row items-center gap-1">
                    <FontAwesome
                      name="calendar"
                      size={11}
                      color={isOverdue(todo.dueDate, todo.status) ? '#EF4444' : '#6E6E6B'}
                    />
                    <Text
                      className={`text-xs font-normal ${
                        isOverdue(todo.dueDate, todo.status) ? 'text-accent-red' : 'text-natural-500'
                      }`}
                    >
                      {formatDueDate(todo.dueDate)}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
}
