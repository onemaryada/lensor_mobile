import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen} from '@/screens/Home';
import {SettingsScreen} from '@/screens/Settings';
import {colors, typography} from '@/theme';
import type {MainTabParamList} from '@/types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

const homeIcon = ({color, size, focused}: {color: string; size: number; focused: boolean}) => (
  <Icon name={focused ? 'home-variant' : 'home-variant-outline'} size={size} color={color} />
);

const settingsIcon = ({color, size, focused}: {color: string; size: number; focused: boolean}) => (
  <Icon name={focused ? 'cog' : 'cog-outline'} size={size} color={color} />
);

export const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textTertiary,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabLabel,
      animation: 'shift',
    }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: homeIcon}} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: settingsIcon}} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopColor: colors.border,
    height: 64,
    paddingTop: 6,
    paddingBottom: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: typography.weights.semiBold,
  },
});
