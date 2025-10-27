import React from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { Todo, TodoStatus } from '@/types/todo';
import { useTodos } from '@/contexts/TodoContext';
import { Text } from './Themed';
import { useColorScheme } from './useColorScheme';
import Colors from '@/constants/Colors';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { updateTodoStatus, deleteTodo } = useTodos();
  const colorScheme = useColorScheme();

  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.TODO:
        return '#6B7280';
      case TodoStatus.IN_PROGRESS:
        return '#F59E0B';
      case TodoStatus.DONE:
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getStatusLabel = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.TODO:
        return 'TODO';
      case TodoStatus.IN_PROGRESS:
        return '進行中';
      case TodoStatus.DONE:
        return '完了';
      default:
        return 'TODO';
    }
  };

  const cycleStatus = () => {
    if (todo.status === TodoStatus.TODO) {
      updateTodoStatus(todo.id, TodoStatus.IN_PROGRESS);
    } else if (todo.status === TodoStatus.IN_PROGRESS) {
      updateTodoStatus(todo.id, TodoStatus.DONE);
    } else {
      updateTodoStatus(todo.id, TodoStatus.TODO);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'タスクを削除',
      'このタスクを削除してもよろしいですか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '削除',
          style: 'destructive',
          onPress: () => deleteTodo(todo.id),
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        },
      ]}
    >
      <TouchableOpacity onPress={cycleStatus} style={styles.statusButton}>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: getStatusColor(todo.status) },
          ]}
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              todo.status === TodoStatus.DONE && styles.completedText,
            ]}
          >
            {todo.title}
          </Text>
          <Text style={styles.statusLabel}>{getStatusLabel(todo.status)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>削除</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    gap: 8,
  },
  statusButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  statusLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#EF4444',
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
