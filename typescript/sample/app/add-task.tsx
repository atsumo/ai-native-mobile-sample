import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTodos } from '@/contexts/TodoContext';

export default function AddTaskModal() {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = () => {
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-natural-50"
    >
      <View className="flex-1">
        {/* Header */}
        <View className="pt-12 px-4 pb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center"
          >
            <FontAwesome name="close" size={20} color="#1C1D22" />
          </TouchableOpacity>
        </View>

        {/* Input Area */}
        <View className="px-6 py-4 mx-4 bg-white rounded-2xl">
          <TextInput
            className="text-2xl text-natural-900 mb-4"
            placeholder="New task"
            placeholderTextColor="#B0B0AD"
            value={text}
            onChangeText={setText}
            multiline
            autoFocus
          />

          <View className="flex-row gap-2">
            <View className="flex-row items-center px-3 py-2 bg-natural-50 rounded-lg">
              <FontAwesome name="inbox" size={14} color="#6E6E6B" />
              <Text className="ml-2 text-sm text-natural-700">Inbox</Text>
            </View>
            <View className="flex-row items-center px-3 py-2 bg-natural-50 rounded-lg">
              <FontAwesome name="calendar" size={14} color="#6E6E6B" />
              <Text className="ml-2 text-sm text-natural-700">Due date</Text>
            </View>
            <View className="flex-row items-center px-3 py-2 bg-natural-50 rounded-lg">
              <FontAwesome name="user" size={14} color="#6E6E6B" />
              <Text className="ml-2 text-sm text-natural-700">Assignee</Text>
            </View>
          </View>
        </View>

        {/* Bottom Actions */}
        <View className="absolute bottom-0 left-0 right-0 pb-8">
          <View
            className="flex-row items-center justify-between px-4"
            style={{ paddingBottom: Platform.OS === 'ios' ? 34 : 12 }}
          >
            <View className="flex-row gap-2">
              <View className="flex-row items-center px-4 py-2 bg-natural-200 rounded-full">
                <FontAwesome name="check-circle" size={16} color="#1C1D22" />
                <Text className="ml-2 text-sm font-medium text-natural-900">Task</Text>
              </View>
              <View className="flex-row items-center px-4 py-2 bg-white rounded-full">
                <FontAwesome name="list" size={16} color="#6E6E6B" />
                <Text className="ml-2 text-sm text-natural-700">List</Text>
              </View>
              <View className="flex-row items-center px-4 py-2 bg-white rounded-full">
                <FontAwesome name="comment" size={16} color="#6E6E6B" />
                <Text className="ml-2 text-sm text-natural-700">Talk</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="w-12 h-12 bg-primary rounded-full items-center justify-center"
              disabled={!text.trim()}
              style={{ opacity: text.trim() ? 1 : 0.5 }}
            >
              <FontAwesome name="check" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
