import React, {memo} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View, type ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {usePressScale} from '@/hooks/usePressScale';
import {colors} from '@/theme';
import {styles} from './styles';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const GRADIENT_COLORS = [colors.primary, colors.accent];

const ButtonComponent = ({
  label,
  onPress,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
}: ButtonProps) => {
  const {animatedStyle, onPressIn, onPressOut} = usePressScale();
  const isDisabled = disabled || loading;

  const labelStyle = [
    styles.label,
    variant === 'secondary' && styles.secondaryLabel,
    variant === 'ghost' && styles.ghostLabel,
  ];
  const contentColor =
    variant === 'primary' ? colors.white : variant === 'secondary' ? colors.primary : colors.textSecondary;

  const content = (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator color={contentColor} />
      ) : (
        <>
          {icon ? <Icon name={icon} size={22} color={contentColor} /> : null}
          <Text style={labelStyle}>{label}</Text>
        </>
      )}
    </View>
  );

  return (
    <Animated.View
      style={[
        animatedStyle,
        fullWidth && styles.fullWidth,
        variant === 'primary' && styles.primaryShadow,
        isDisabled && styles.disabled,
        style,
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{disabled: isDisabled, busy: loading}}
        disabled={isDisabled}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.base, variant === 'secondary' && styles.secondary, variant === 'ghost' && styles.ghost]}>
        {variant === 'primary' ? (
          <LinearGradient
            colors={GRADIENT_COLORS}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        {content}
      </Pressable>
    </Animated.View>
  );
};

export const Button = memo(ButtonComponent);
