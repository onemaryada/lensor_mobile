import React, {useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '@/components/Button';
import {useImagePicker} from '@/hooks/useImagePicker';
import {useToast} from '@/context/ToastContext';
import {colors} from '@/theme';
import type {MainTabScreenProps} from '@/types/navigation';
import {styles} from './styles';

const FEATURES = [
  {icon: 'tune-variant', label: 'Fine-tune adjustments'},
  {icon: 'auto-fix', label: 'Beautiful preset filters'},
  {icon: 'download-circle-outline', label: 'High quality export'},
] as const;

const GRADIENT = [colors.primary, colors.accent];

export const HomeScreen = ({navigation}: MainTabScreenProps<'Home'>) => {
  const {pickImage, isPicking, error} = useImagePicker();
  const {showToast} = useToast();

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
    }
  }, [error, showToast]);

  const onSelectImage = useCallback(async () => {
    const image = await pickImage();
    if (image) {
      navigation.navigate('ImageEditor', {
        imageUri: image.uri,
        imageWidth: image.width,
        imageHeight: image.height,
      });
    }
  }, [pickImage, navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.duration(420)}>
          <Text style={styles.greeting}>Welcome to</Text>
          <Text style={styles.brand} accessibilityRole="header">
            Len<Text style={styles.brandAccent}>sor</Text>
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(120).duration(420)} style={styles.heroCard}>
          <LinearGradient colors={GRADIENT} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.heroGradient}>
            <View style={styles.heroIconWrapper}>
              <Icon name="image-edit-outline" size={48} color={colors.white} />
            </View>
            <Text style={styles.heroTitle}>Turn photos into art</Text>
            <Text style={styles.heroSubtitle}>
              Pick a photo from your gallery and start editing with pro-level tools and filters.
            </Text>
            <Button
              label="Select Image"
              icon="image-plus"
              variant="secondary"
              loading={isPicking}
              onPress={onSelectImage}
              style={styles.selectButton}
              fullWidth
            />
          </LinearGradient>
        </Animated.View>

        <View style={styles.featuresRow}>
          {FEATURES.map((feature, index) => (
            <Animated.View
              key={feature.icon}
              entering={FadeInUp.delay(240 + index * 90).duration(380)}
              style={styles.featureCard}>
              <Icon name={feature.icon} size={26} color={colors.primary} />
              <Text style={styles.featureLabel}>{feature.label}</Text>
            </Animated.View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
