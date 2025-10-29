import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, PanResponder, Dimensions, Platform } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const BUTTON_SIZE = 56;
const SCREEN_PADDING = 20;

export function FloatingDebugButton() {
  const [showMenu, setShowMenu] = useState(false);
  const pan = useRef(new Animated.ValueXY({ x: Dimensions.get('window').width - BUTTON_SIZE - SCREEN_PADDING, y: 100 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        pan.flattenOffset();

        // If the movement is small, treat it as a tap
        if (Math.abs(gesture.dx) < 10 && Math.abs(gesture.dy) < 10) {
          setShowMenu(true);
          return;
        }

        // Snap to nearest edge
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
        const currentX = (pan.x as any)._value;
        const currentY = (pan.y as any)._value;

        // Determine which edge is closest
        let finalX = currentX < screenWidth / 2 ? SCREEN_PADDING : screenWidth - BUTTON_SIZE - SCREEN_PADDING;
        let finalY = Math.max(SCREEN_PADDING, Math.min(screenHeight - BUTTON_SIZE - SCREEN_PADDING - 100, currentY));

        Animated.spring(pan, {
          toValue: { x: finalX, y: finalY },
          useNativeDriver: false,
          tension: 50,
          friction: 7,
        }).start();
      },
    })
  ).current;

  const handleOpenStorybook = () => {
    setShowMenu(false);
    router.push('/storybook' as any);
  };

  const handleClearStorage = async () => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;

      // 確認なしでクリア
      await AsyncStorage.clear();

      // メニューを閉じる
      setShowMenu(false);

      // 少し待ってからアプリをリロード
      setTimeout(() => {
        if (__DEV__) {
          // 開発モードではDevSettingsを使用
          const { DevSettings } = require('react-native');
          if (DevSettings && DevSettings.reload) {
            DevSettings.reload();
          }
        }
      }, 300);
    } catch (error) {
      console.error('Failed to clear storage:', error);
      setShowMenu(false);
    }
  };

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          left: pan.x,
          top: pan.y,
          zIndex: 9999,
        }}
        {...panResponder.panHandlers}
      >
        <View
          className="rounded-full shadow-lg"
          style={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            backgroundColor: '#FF6600',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesome name="bug" size={24} color="white" />
        </View>
      </Animated.View>

      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            className="bg-white dark:bg-natural-800 rounded-2xl p-6 mx-6"
            style={{ width: '85%', maxWidth: 400 }}
          >
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-2xl font-bold text-natural-900 dark:text-natural-50">🛠️ デバッグメニュー</Text>
              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <FontAwesome name="times" size={24} color="#8F8F8C" />
              </TouchableOpacity>
            </View>

            <View className="space-y-3">
              <TouchableOpacity
                className="p-4 rounded-xl bg-accent-orange/10 border border-accent-orange/30 active:bg-accent-orange/20"
                onPress={handleOpenStorybook}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-accent-orange items-center justify-center mr-3">
                    <FontAwesome name="book" size={18} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-natural-900 dark:text-natural-50">Storybook</Text>
                    <Text className="text-sm text-natural-500 mt-0.5">コンポーネントカタログを開く</Text>
                  </View>
                  <FontAwesome name="chevron-right" size={16} color="#8F8F8C" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="p-4 rounded-xl bg-natural-100 dark:bg-natural-700 border border-natural-200 dark:border-natural-600 active:bg-natural-200 dark:active:bg-natural-600"
                onPress={handleClearStorage}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-natural-400 dark:bg-natural-500 items-center justify-center mr-3">
                    <FontAwesome name="trash-o" size={18} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-natural-900 dark:text-natural-50">ストレージをクリア</Text>
                    <Text className="text-sm text-natural-500 mt-0.5">全てのデータを削除</Text>
                  </View>
                  <FontAwesome name="chevron-right" size={16} color="#8F8F8C" />
                </View>
              </TouchableOpacity>

              <View className="p-4 rounded-xl bg-natural-50 dark:bg-natural-900 border border-natural-200 dark:border-natural-700">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-primary items-center justify-center mr-3">
                    <FontAwesome name="info" size={18} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-natural-900 dark:text-natural-50">アプリ情報</Text>
                    <Text className="text-xs text-natural-500 mt-1">開発モード: {__DEV__ ? 'ON' : 'OFF'}</Text>
                    <Text className="text-xs text-natural-500">Platform: {Platform.OS}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
