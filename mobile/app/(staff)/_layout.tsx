/**
 * TRAVIA DUBAI — Staff Tab Navigation (PRD §38)
 * 5 Tabs: Ana Sayfa, Müşteriler, Mesajlar, Operasyon, Menü
 */
import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../src/design/tokens';
import { fontFamily } from '../../src/design/typography';

export default function StaffTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="customers"
        options={{
          title: 'Müşteriler',
          tabBarIcon: ({ color }) => (
            <Feather name="users" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="messages"
        options={{
          title: 'Mesajlar',
          tabBarIcon: ({ color }) => (
            <Feather name="message-square" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="operations"
        options={{
          title: 'Operasyon',
          tabBarIcon: ({ color }) => (
            <Feather name="calendar" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menü',
          tabBarIcon: ({ color }) => (
            <Feather name="menu" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#070A12',
    borderTopWidth: 1,
    borderTopColor: 'rgba(201, 166, 107, 0.28)',
    height: Platform.OS === 'ios' ? 88 : 66,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  tabLabel: {
    fontFamily: fontFamily.sans.semiBold,
    fontSize: 10,
    marginTop: 3,
    letterSpacing: 0.3,
  },
});
