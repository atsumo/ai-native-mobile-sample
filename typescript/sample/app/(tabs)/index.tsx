import { FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TodoItem } from '@/components/TodoItem';
import { useTodos } from '@/contexts/TodoContext';

export default function TodoScreen() {
  const { filteredTodos } = useTodos();

  return (
    <View className="flex-1 bg-natural-50 dark:bg-natural-900">
      <SafeAreaView edges={['top']} className="bg-white dark:bg-natural-800">
        <View className="px-6 pb-6">
          <Text className="text-4xl font-bold text-natural-900 dark:text-natural-50">
            Inbox
          </Text>
        </View>
      </SafeAreaView>
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem todo={item} />}
        className="flex-1 bg-white dark:bg-natural-800"
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
