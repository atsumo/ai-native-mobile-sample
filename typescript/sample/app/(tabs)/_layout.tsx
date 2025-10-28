import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, router } from 'expo-router';
import { View, TouchableOpacity, Platform } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1C1D22',
        tabBarInactiveTintColor: '#8F8F8C',
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 12,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
      }}
      tabBar={(props) => (
        <View>
          <BottomTabBar {...props} />
          <View className="absolute bottom-0 left-0 right-0" style={{ paddingBottom: Platform.OS === 'ios' ? 28 : 12, alignItems: 'center' }}>
            <TouchableOpacity
              className="bg-primary rounded-full"
              style={{
                width: 56,
                height: 56,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: Platform.OS === 'ios' ? 48 : 24,
              }}
              onPress={() => router.push('/add-task')}
            >
              <FontAwesome name="plus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: '統計',
          tabBarIcon: ({ color }) => <TabBarIcon name="bell-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
