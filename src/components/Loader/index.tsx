import React, {memo} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {colors} from '@/theme';
import {styles} from './styles';

interface LoaderProps {
  label?: string;
  overlay?: boolean;
}

const LoaderComponent = ({label, overlay = false}: LoaderProps) => {
  if (!overlay) {
    return (
      <View style={styles.inline} accessibilityRole="progressbar">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <Animated.View entering={FadeIn.duration(180)} exiting={FadeOut.duration(180)} style={styles.overlay}>
      <View style={styles.card} accessibilityRole="progressbar" accessibilityLabel={label ?? 'Loading'}>
        <ActivityIndicator size="large" color={colors.primary} />
        {label ? <Text style={styles.label}>{label}</Text> : null}
      </View>
    </Animated.View>
  );
};

export const Loader = memo(LoaderComponent);
