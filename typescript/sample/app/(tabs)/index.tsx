import { FlatList, View } from 'react-native';
import { TodoInput } from '@/components/TodoInput';
import { TodoItem } from '@/components/TodoItem';
import { useTodos } from '@/contexts/TodoContext';

export default function TodoScreen() {
  const { filteredTodos } = useTodos();

  return (
    <View className="flex-1 bg-natural-50 dark:bg-natural-900">
      <TodoInput />
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem todo={item} />}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}
