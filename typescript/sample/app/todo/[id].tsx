import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import Markdown from 'react-native-markdown-display';
import { useTodos } from '@/contexts/TodoContext';
import { TodoStatus } from '@/types/todo';

export default function TodoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { todos, updateTodo, updateTodoStatus, deleteTodo } = useTodos();
  const todo = todos.find((t) => t.id === id);

  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(todo?.dueDate ? new Date(todo.dueDate) : new Date());

  if (!todo) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-natural-400">Task not found</Text>
      </View>
    );
  }

  const handleBlurTitle = () => {
    if (title.trim()) {
      updateTodo(id!, { title: title.trim() });
    } else {
      setTitle(todo.title);
    }
    setIsEditingTitle(false);
  };

  const handleBlurDescription = () => {
    updateTodo(id!, { description });
    setIsEditingDescription(false);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      updateTodo(id!, { dueDate: date.getTime() });
    }
  };

  const handleRemoveDueDate = () => {
    updateTodo(id!, { dueDate: undefined });
    setShowDatePicker(false);
  };

  const cycleStatus = () => {
    if (todo.status === TodoStatus.TODO) {
      updateTodoStatus(id!, TodoStatus.DONE);
    } else {
      updateTodoStatus(id!, TodoStatus.TODO);
    }
  };

  const handleDelete = () => {
    deleteTodo(id!);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-natural-50"
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="pt-12 px-4 pb-4 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center"
          >
            <FontAwesome name="chevron-left" size={18} color="#1C1D22" />
          </TouchableOpacity>
          {isEditingTitle || isEditingDescription ? (
            <TouchableOpacity
              onPress={() => {
                if (isEditingTitle) handleBlurTitle();
                if (isEditingDescription) handleBlurDescription();
              }}
              className="px-4 py-2 rounded-full bg-white"
            >
              <Text className="text-base font-medium text-natural-900">Done</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-white items-center justify-center"
              onPress={() => setShowMenuModal(true)}
            >
              <FontAwesome name="ellipsis-h" size={18} color="#1C1D22" />
            </TouchableOpacity>
          )}
        </View>

        {/* Task Title */}
        <View className="px-4 py-4 mx-4 bg-white rounded-2xl mb-4">
          <View className="flex-row items-center gap-3 mb-4">
            <TouchableOpacity onPress={cycleStatus}>
              <View
                className={`w-6 h-6 rounded-full border-2 justify-center items-center ${
                  todo.status === TodoStatus.DONE
                    ? 'bg-accent-orange border-accent-orange'
                    : 'border-natural-300'
                }`}
              >
                {todo.status === TodoStatus.DONE && (
                  <FontAwesome name="check" size={12} color="white" />
                )}
              </View>
            </TouchableOpacity>
            <View className="flex-1">
              <TextInput
                className={`text-xl font-semibold ${
                  todo.status === TodoStatus.DONE
                    ? 'text-natural-400 line-through'
                    : 'text-natural-900'
                }`}
                style={{
                  fontSize: 20,
                  lineHeight: 28,
                  fontWeight: '600',
                  padding: 0,
                  margin: 0,
                  textDecorationLine: todo.status === TodoStatus.DONE ? 'line-through' : 'none',
                  textDecorationColor: todo.status === TodoStatus.DONE ? '#FF6600' : undefined,
                }}
                value={title}
                onChangeText={setTitle}
                onFocus={() => setIsEditingTitle(true)}
                onBlur={handleBlurTitle}
                multiline
              />
            </View>
          </View>

          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-row items-center px-3 py-2 bg-natural-50 rounded-lg"
              onPress={() => setShowDatePicker(true)}
            >
              <FontAwesome name="calendar" size={14} color="#6E6E6B" />
              <Text className="ml-2 text-sm text-natural-700">
                {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'Due date'}
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center px-3 py-2 bg-natural-50 rounded-lg">
              <FontAwesome name="user" size={14} color="#6E6E6B" />
              <Text className="ml-2 text-sm text-natural-700">Assignee</Text>
            </View>
            <View className="flex-row items-center px-3 py-2 bg-natural-50 rounded-lg">
              <FontAwesome name="tag" size={14} color="#6E6E6B" />
              <Text className="ml-2 text-sm text-natural-700">Label</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View className="px-4 py-4 mx-4 bg-white rounded-2xl mb-4">
          {!isEditingDescription && !description ? (
            <TouchableOpacity onPress={() => setIsEditingDescription(true)}>
              <Text className="text-natural-400">Leave a message...</Text>
            </TouchableOpacity>
          ) : !isEditingDescription ? (
            <TouchableOpacity onPress={() => setIsEditingDescription(true)}>
              <Markdown
                style={{
                  body: { color: '#1C1D22', fontSize: 15, lineHeight: 22 },
                  heading1: { fontSize: 24, fontWeight: 'bold', marginTop: 8, marginBottom: 8 },
                  heading2: { fontSize: 20, fontWeight: 'bold', marginTop: 6, marginBottom: 6 },
                  heading3: { fontSize: 18, fontWeight: 'bold', marginTop: 4, marginBottom: 4 },
                  strong: { fontWeight: 'bold' },
                  em: { fontStyle: 'italic' },
                  bullet_list: { marginTop: 4, marginBottom: 4 },
                  ordered_list: { marginTop: 4, marginBottom: 4 },
                  list_item: { marginBottom: 2 },
                  code_inline: {
                    backgroundColor: '#F3F3F2',
                    borderRadius: 4,
                    paddingHorizontal: 4,
                    fontFamily: 'monospace'
                  },
                  code_block: {
                    backgroundColor: '#F3F3F2',
                    borderRadius: 8,
                    padding: 12,
                    fontFamily: 'monospace'
                  },
                }}
              >
                {description}
              </Markdown>
            </TouchableOpacity>
          ) : (
            <TextInput
              className="text-base text-natural-900 min-h-[100px]"
              placeholder="Leave a message..."
              placeholderTextColor="#B0B0AD"
              value={description}
              onChangeText={setDescription}
              onBlur={handleBlurDescription}
              multiline
              autoFocus
              textAlignVertical="top"
            />
          )}
        </View>

        {/* Markdown toolbar (when editing) */}
        {isEditingDescription && (
          <View className="px-4 mb-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => setDescription((prev) => prev + '# ')}
                  className="px-3 py-2 bg-white rounded-lg"
                >
                  <Text className="text-natural-700 font-medium">H1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDescription((prev) => prev + '## ')}
                  className="px-3 py-2 bg-white rounded-lg"
                >
                  <Text className="text-natural-700 font-medium">H2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDescription((prev) => prev + '### ')}
                  className="px-3 py-2 bg-white rounded-lg"
                >
                  <Text className="text-natural-700 font-medium">H3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDescription((prev) => prev + '**bold**')}
                  className="px-3 py-2 bg-white rounded-lg"
                >
                  <Text className="text-natural-700 font-bold">B</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDescription((prev) => prev + '*italic*')}
                  className="px-3 py-2 bg-white rounded-lg"
                >
                  <Text className="text-natural-700 italic">I</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDescription((prev) => prev + '- ')}
                  className="px-3 py-2 bg-white rounded-lg"
                >
                  <FontAwesome name="list-ul" size={16} color="#6E6E6B" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}

        {/* Created info */}
        <View className="px-4 py-4 items-center">
          <Text className="text-natural-400 text-sm">
            Created {new Date(todo.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
            <View className="flex-1 justify-end bg-black/50">
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View className="bg-white rounded-t-3xl p-4 pb-8">
                  <View className="flex-row justify-between items-center mb-4">
                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                      <Text className="text-base text-natural-700">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="text-base font-semibold text-natural-900">Select Date</Text>
                    {todo.dueDate && (
                      <TouchableOpacity onPress={handleRemoveDueDate}>
                        <Text className="text-base text-accent-red">Remove</Text>
                      </TouchableOpacity>
                    )}
                    {!todo.dueDate && <View style={{ width: 60 }} />}
                  </View>
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    style={{ height: 200 }}
                  />
                  {Platform.OS === 'ios' && (
                    <TouchableOpacity
                      className="mt-4 py-3 bg-accent-orange rounded-xl items-center"
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text className="text-white font-semibold text-base">Done</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {/* Menu Modal */}
      {showMenuModal && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showMenuModal}
          onRequestClose={() => setShowMenuModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowMenuModal(false)}>
            <View className="flex-1 justify-end bg-black/50">
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View className="bg-white rounded-t-3xl p-4 pb-8">
                  <View className="w-12 h-1 bg-natural-200 rounded-full self-center mb-4" />
                  <TouchableOpacity
                    className="py-4 px-4 flex-row items-center gap-3"
                    onPress={() => {
                      setShowMenuModal(false);
                      setShowDeleteConfirm(true);
                    }}
                  >
                    <FontAwesome name="trash-o" size={20} color="#EF4444" />
                    <Text className="text-base text-accent-red font-medium">Delete Task</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showDeleteConfirm}
          onRequestClose={() => setShowDeleteConfirm(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowDeleteConfirm(false)}>
            <View className="flex-1 justify-center items-center bg-black/50 px-8">
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View className="bg-white rounded-2xl p-6 w-full">
                  <Text className="text-xl font-semibold text-natural-900 mb-2">Delete Task</Text>
                  <Text className="text-base text-natural-600 mb-6">
                    Are you sure you want to delete this task? This action cannot be undone.
                  </Text>
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      className="flex-1 py-3 bg-natural-100 rounded-xl items-center"
                      onPress={() => setShowDeleteConfirm(false)}
                    >
                      <Text className="text-base font-medium text-natural-900">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1 py-3 bg-accent-red rounded-xl items-center"
                      onPress={handleDelete}
                    >
                      <Text className="text-base font-medium text-white">Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </KeyboardAvoidingView>
  );
}
