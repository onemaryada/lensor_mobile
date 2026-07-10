import React from 'react';
import {DefaultTheme, NavigationContainer, type Theme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from '@/screens/Splash';
import {OnboardingScreen} from '@/screens/Onboarding';
import {ImageEditorScreen} from '@/screens/ImageEditor';
import {PrivacyPolicyScreen} from '@/screens/PrivacyPolicy';
import {TermsConditionsScreen} from '@/screens/TermsConditions';
import {AppInfoScreen} from '@/screens/AppInfo';
import {colors} from '@/theme';
import type {RootStackParamList} from '@/types/navigation';
import {MainTabs} from './MainTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.card,
    text: colors.textPrimary,
    border: colors.border,
  },
};

export const RootNavigator = () => (
  <NavigationContainer theme={navigationTheme}>
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
        animationDuration: 260,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} options={{animation: 'fade'}} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{animation: 'fade'}} />
      <Stack.Screen name="Main" component={MainTabs} options={{animation: 'fade'}} />
      <Stack.Screen name="ImageEditor" component={ImageEditorScreen} options={{animation: 'slide_from_right'}} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
      <Stack.Screen name="AppInfo" component={AppInfoScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
