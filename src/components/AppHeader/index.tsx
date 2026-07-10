import React, {memo} from 'react';
import {Pressable, Text, View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@/theme';
import {styles} from './styles';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  dark?: boolean;
  rightIcon?: string;
  rightText?: string;
  isRightLoading?: boolean;
  onRightPress?: () => void;
}

const AppHeaderComponent = ({
  title,
  showBack = true,
  dark = false,
  rightIcon,
  rightText,
  isRightLoading,
  onRightPress,
}: AppHeaderProps) => {
  const navigation = useNavigation();
  const iconColor = dark ? colors.editorText : colors.textPrimary;

  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={8}
          onPress={() => navigation.goBack()}
          style={[styles.iconButton, dark && styles.darkIconButton]}>
          <Icon name="arrow-left" size={22} color={iconColor} />
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}
      <Text style={[styles.title, dark && styles.darkTitle]} numberOfLines={1}>
        {title}
      </Text>
      {isRightLoading ? (
        <View style={[styles.iconButton, dark && styles.darkIconButton]}>
          <ActivityIndicator size="small" color={iconColor} />
        </View>
      ) : rightIcon || rightText ? (
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={onRightPress}
          style={[styles.iconButton, dark && styles.darkIconButton]}>
          {rightIcon ? (
            <Icon name={rightIcon} size={22} color={iconColor} />
          ) : (
            <Text style={{color: iconColor, fontWeight: '600', fontSize: 16}}>{rightText}</Text>
          )}
        </Pressable>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
};

export const AppHeader = memo(AppHeaderComponent);
