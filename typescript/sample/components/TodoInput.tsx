import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useTodos } from '@/contexts/TodoContext';
import { Text } from './Themed';
import { useColorScheme } from './useColorScheme';
import Colors from '@/constants/Colors';

export function TodoInput() {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();
  const colorScheme = useColorScheme();

  const handleAddTodo = () => {
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            color: Colors[colorScheme ?? 'light'].text,
            borderColor: Colors[colorScheme ?? 'light'].tint,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
        ]}
        placeholder="新しいタスクを追加..."
        placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAddTodo}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[
          styles.addButton,
          { backgroundColor: Colors[colorScheme ?? 'light'].tint },
        ]}
        onPress={handleAddTodo}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
