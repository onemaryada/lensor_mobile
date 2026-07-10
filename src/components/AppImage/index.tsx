import React, {memo, useCallback, useState} from 'react';
import {ActivityIndicator, View, type ImageStyle, type StyleProp} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@/theme';
import {styles} from './styles';

interface AppImageProps {
  uri: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain';
  accessibilityLabel?: string;
}

/** Image with graceful loading + error states and a fade-in reveal. */
const AppImageComponent = ({uri, style, resizeMode = 'cover', accessibilityLabel}: AppImageProps) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const onLoad = useCallback(() => setStatus('loaded'), []);
  const onError = useCallback(() => setStatus('error'), []);

  return (
    <View style={[styles.container, style]}>
      {status !== 'error' ? (
        <Animated.Image
          entering={FadeIn.duration(280)}
          source={{uri}}
          resizeMode={resizeMode}
          onLoad={onLoad}
          onError={onError}
          style={styles.image}
          accessibilityLabel={accessibilityLabel}
          accessible={!!accessibilityLabel}
        />
      ) : null}
      {status === 'loading' ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : null}
      {status === 'error' ? (
        <View style={styles.center}>
          <Icon name="image-broken-variant" size={32} color={colors.textTertiary} />
        </View>
      ) : null}
    </View>
  );
};

export const AppImage = memo(AppImageComponent);
