import React, {useCallback} from 'react';
import {Linking, Pressable, ScrollView, Share, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {APP_INFO} from '@/constants/app';
import {useToast} from '@/context/ToastContext';
import {colors} from '@/theme';
import type {MainTabScreenProps} from '@/types/navigation';
import {styles} from './styles';

interface SettingsItem {
  key: string;
  label: string;
  icon: string;
  value?: string;
  onPress?: () => void;
}

interface SettingsGroup {
  label: string;
  items: SettingsItem[];
}

const Row = ({item, isLast}: {item: SettingsItem; isLast: boolean}) => (
  <>
    <Pressable
      accessibilityRole={item.onPress ? 'button' : 'text'}
      accessibilityLabel={item.label}
      disabled={!item.onPress}
      onPress={item.onPress}
      android_ripple={{color: colors.border}}
      style={({pressed}) => [styles.row, pressed && !!item.onPress && styles.rowPressed]}>
      <View style={styles.rowIconWrapper}>
        <Icon name={item.icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.rowLabel}>{item.label}</Text>
      {item.value ? <Text style={styles.rowValue}>{item.value}</Text> : null}
      {item.onPress ? <Icon name="chevron-right" size={22} color={colors.textTertiary} /> : null}
    </Pressable>
    {!isLast ? <View style={styles.separator} /> : null}
  </>
);

export const SettingsScreen = (_props: MainTabScreenProps<'Settings'>) => {
  const navigation = useNavigation();
  const {showToast} = useToast();

  const onRateApp = useCallback(async () => {
    const supported = await Linking.canOpenURL(APP_INFO.playStoreUrl);
    if (supported) {
      await Linking.openURL(APP_INFO.playStoreUrl);
    } else {
      showToast('Could not open the Play Store.', 'error');
    }
  }, [showToast]);

  const onShareApp = useCallback(async () => {
    try {
      await Share.share({
        message: `Check out ${APP_INFO.name} — a beautiful photo editor for Android!\n${APP_INFO.playStoreUrl}`,
      });
    } catch {
      showToast('Sharing failed. Please try again.', 'error');
    }
  }, [showToast]);

  const groups: SettingsGroup[] = [
    {
      label: 'Legal',
      items: [
        {
          key: 'privacy',
          label: 'Privacy Policy',
          icon: 'shield-lock-outline',
          onPress: () => navigation.navigate('PrivacyPolicy'),
        },
        {
          key: 'terms',
          label: 'Terms & Conditions',
          icon: 'file-document-outline',
          onPress: () => navigation.navigate('TermsConditions'),
        },
      ],
    },
    {
      label: 'About',
      items: [
        {
          key: 'info',
          label: 'App Info',
          icon: 'information-outline',
          onPress: () => navigation.navigate('AppInfo'),
        },
        {key: 'rate', label: 'Rate App', icon: 'star-outline', onPress: onRateApp},
        {key: 'share', label: 'Share App', icon: 'share-variant-outline', onPress: onShareApp},
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle} accessibilityRole="header">
          Settings
        </Text>
        {groups.map(group => (
          <View key={group.label}>
            <Text style={styles.groupLabel}>{group.label}</Text>
            <View style={styles.group}>
              {group.items.map((item, index) => (
                <Row key={item.key} item={item} isLast={index === group.items.length - 1} />
              ))}
            </View>
          </View>
        ))}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {APP_INFO.name} v{APP_INFO.version}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
