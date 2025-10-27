import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useTodos } from '@/contexts/TodoContext';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function StatsScreen() {
  const { stats, todos } = useTodos();
  const colorScheme = useColorScheme();

  const completionRate =
    stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  const today = new Date().toDateString();
  const todayTodos = todos.filter(
    (todo) => new Date(todo.createdAt).toDateString() === today
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>統計</Text>

      <View
        style={[
          styles.card,
          {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          },
        ]}
      >
        <Text style={styles.cardTitle}>タスク概要</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>合計</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#6B7280' }]}>
              {stats.todo}
            </Text>
            <Text style={styles.statLabel}>TODO</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>
              {stats.inProgress}
            </Text>
            <Text style={styles.statLabel}>進行中</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#10B981' }]}>
              {stats.done}
            </Text>
            <Text style={styles.statLabel}>完了</Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          },
        ]}
      >
        <Text style={styles.cardTitle}>達成率</Text>
        <Text style={[styles.bigNumber, { color: Colors[colorScheme ?? 'light'].tint }]}>
          {completionRate}%
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          },
        ]}
      >
        <Text style={styles.cardTitle}>今日追加したタスク</Text>
        <Text style={styles.bigNumber}>{todayTodos.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  bigNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
