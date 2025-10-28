import { View, Text, ScrollView } from 'react-native';
import { useTodos } from '@/contexts/TodoContext';

export default function StatsScreen() {
  const { stats, todos } = useTodos();

  const completionRate =
    stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  const today = new Date().toDateString();
  const todayTodos = todos.filter(
    (todo) => new Date(todo.createdAt).toDateString() === today
  );

  return (
    <ScrollView className="flex-1 bg-natural-50 dark:bg-natural-900">
      <View className="p-4">
        <Text className="text-3xl font-bold mb-6 text-natural-900 dark:text-natural-50">統計</Text>

        <View className="p-6 rounded-xl bg-white dark:bg-natural-800 mb-4 shadow-superlist-md">
          <Text className="text-lg font-semibold mb-5 text-natural-900 dark:text-natural-50">タスク概要</Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-4xl font-bold mb-2 text-natural-900 dark:text-natural-50">{stats.total}</Text>
              <Text className="text-xs font-medium text-natural-500">合計</Text>
            </View>
            <View className="items-center">
              <Text className="text-4xl font-bold mb-2 text-natural-400">
                {stats.todo}
              </Text>
              <Text className="text-xs font-medium text-natural-500">TODO</Text>
            </View>
            <View className="items-center">
              <Text className="text-4xl font-bold mb-2 text-accent-orange">
                {stats.inProgress}
              </Text>
              <Text className="text-xs font-medium text-natural-500">進行中</Text>
            </View>
            <View className="items-center">
              <Text className="text-4xl font-bold mb-2 text-primary">
                {stats.done}
              </Text>
              <Text className="text-xs font-medium text-natural-500">完了</Text>
            </View>
          </View>
        </View>

        <View className="p-6 rounded-xl bg-white dark:bg-natural-800 mb-4 shadow-superlist-md">
          <Text className="text-lg font-semibold mb-5 text-natural-900 dark:text-natural-50">達成率</Text>
          <View className="items-center py-4">
            <Text className="text-6xl font-bold text-primary mb-2">
              {completionRate}%
            </Text>
            <View className="w-full h-2 bg-natural-200 dark:bg-natural-700 rounded-full mt-4 overflow-hidden">
              <View
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </View>
          </View>
        </View>

        <View className="p-6 rounded-xl bg-white dark:bg-natural-800 mb-4 shadow-superlist-md">
          <Text className="text-lg font-semibold mb-5 text-natural-900 dark:text-natural-50">今日追加したタスク</Text>
          <Text className="text-6xl font-bold text-center text-natural-900 dark:text-natural-50">{todayTodos.length}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
