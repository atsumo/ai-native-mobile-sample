import { FlatList, View, Text } from 'react-native';
import { TodoItem } from '@/components/TodoItem';
import { useTodos } from '@/contexts/TodoContext';

export default function TodoScreen() {
  const { filteredTodos } = useTodos();

  return (
    <View className="flex-1 bg-white dark:bg-natural-900">
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem todo={item} />}
        className="flex-1"
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-natural-400 text-base">No tasks yet</Text>
            <Text className="text-natural-300 text-sm mt-2">Tap + to add a new task</Text>
          </View>
        }
      />
    </View>
  );
}
