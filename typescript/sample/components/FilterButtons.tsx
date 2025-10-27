import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FilterType } from '@/types/todo';
import { useTodos } from '@/contexts/TodoContext';
import { Text } from './Themed';
import { useColorScheme } from './useColorScheme';
import Colors from '@/constants/Colors';

export function FilterButtons() {
  const { filter, setFilter } = useTodos();
  const colorScheme = useColorScheme();

  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'すべて' },
    { type: 'active', label: '未完了' },
    { type: 'completed', label: '完了' },
  ];

  return (
    <View style={styles.container}>
      {filters.map((f) => (
        <TouchableOpacity
          key={f.type}
          style={[
            styles.button,
            {
              backgroundColor:
                filter === f.type
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].background,
              borderColor: Colors[colorScheme ?? 'light'].tint,
            },
          ]}
          onPress={() => setFilter(f.type)}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  filter === f.type
                    ? '#fff'
                    : Colors[colorScheme ?? 'light'].text,
              },
            ]}
          >
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
