/**
 * TRAVIA DUBAI — Customer Tab Navigation (PRD §13)
 * 5 Tabs: Ana Sayfa, Seyahatim, Concierge (highlighted center), Keşfet, Profil
 */
import React, { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius } from '../../src/design/tokens';
import { fontFamily, fontSize } from '../../src/design/typography';
import { useAuthStore } from '../../src/stores/authStore';

export default function CustomerTabsLayout() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, router]);
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
      {/* 1. Ana Sayfa */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={20} color={color} />
          ),
        }}
      />

      {/* 2. Seyahatim */}
      <Tabs.Screen
        name="trip"
        options={{
          title: 'Seyahatim',
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={20} color={color} />
          ),
        }}
      />

      {/* 3. Concierge (Prominent Center Button) */}
      <Tabs.Screen
        name="concierge"
        options={{
          title: 'Concierge',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.conciergeCenterBtn, focused && styles.conciergeActive]}>
              <Feather
                name="message-circle"
                size={22}
                color={focused ? colors.textInverse : colors.gold}
              />
            </View>
          ),
        }}
      />

      {/* 4. Keşfet */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Keşfet',
          tabBarIcon: ({ color, size }) => (
            <Feather name="compass" size={20} color={color} />
          ),
        }}
      />

      {/* 5. Profil */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={20} color={color} />
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
  conciergeCenterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(201, 166, 107, 0.16)',
    borderWidth: 1.5,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -14,
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  conciergeActive: {
    backgroundColor: colors.gold,
    borderColor: colors.goldSoft,
    shadowOpacity: 0.6,
  },
});
