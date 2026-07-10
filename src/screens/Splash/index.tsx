import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BootSplash from 'react-native-bootsplash';
import {SPLASH_DURATION_MS} from '@/constants/app';
import {isOnboardingCompleted} from '@/utils/storage';
import type {RootStackScreenProps} from '@/types/navigation';
import {styles} from './styles';

export const SplashScreen = ({navigation}: RootStackScreenProps<'Splash'>) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(14);

  useEffect(() => {
    BootSplash.hide({fade: true}).catch(() => {
      // BootSplash may already be hidden during development reloads.
    });
    opacity.value = withTiming(1, {duration: 700, easing: Easing.out(Easing.cubic)});
    translateY.value = withTiming(0, {duration: 700, easing: Easing.out(Easing.cubic)});

    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: isOnboardingCompleted() ? 'Main' : 'Onboarding'}],
      });
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [navigation, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Text style={styles.brand} accessibilityRole="header">
          Les<Text style={styles.brandAccent}>nar</Text>
        </Text>
        <Text style={styles.tagline}>Edit. Enhance. Share.</Text>
      </Animated.View>
    </View>
  );
};
