import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { useTodos } from '@/contexts/TodoContext';

export function TodoInput() {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { addTodo } = useTodos();

  const handleAddTodo = () => {
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <View className={`mx-4 my-3 px-4 py-3 rounded-xl bg-natural-50 dark:bg-natural-800 border-2 transition-all duration-200 ${isFocused ? 'border-primary shadow-superlist-md' : 'border-transparent'}`}>
      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          className="w-5 h-5 rounded-full border-2 border-natural-300 dark:border-natural-600 justify-center items-center active:scale-95 transition-transform duration-150"
          onPress={handleAddTodo}
        >
          <Text className="text-sm text-natural-400 dark:text-natural-500 font-light leading-none">+</Text>
        </TouchableOpacity>
        <TextInput
          className="flex-1 text-base py-0 text-natural-900 dark:text-natural-50 font-normal"
          placeholder="New task"
          placeholderTextColor="#8F8F8C"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAddTodo}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="done"
        />
      </View>
    </View>
  );
}
