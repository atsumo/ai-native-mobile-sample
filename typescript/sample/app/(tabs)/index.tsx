import { StyleSheet, FlatList } from 'react-native';
import { View } from '@/components/Themed';
import { TodoInput } from '@/components/TodoInput';
import { TodoItem } from '@/components/TodoItem';
import { FilterButtons } from '@/components/FilterButtons';
import { useTodos } from '@/contexts/TodoContext';

export default function TodoScreen() {
  const { filteredTodos } = useTodos();

  return (
    <View style={styles.container}>
      <TodoInput />
      <FilterButtons />
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem todo={item} />}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
