import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import StorybookUI from '../.rnstorybook';

export default function StorybookScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          paddingTop: insets.top,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#E8E8E7',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            height: 56,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1C1D22' }}>Storybook</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: '#F3F3F2',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome name="times" size={18} color="#1C1D22" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    </View>
  );
}
