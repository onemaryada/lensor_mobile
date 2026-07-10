import React, {useCallback, useRef, useState} from 'react';
import {Text, View, type NativeScrollEvent, type NativeSyntheticEvent} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Extrapolation,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from '@/components/Button';
import {colors} from '@/theme';
import {screen} from '@/utils/scale';
import {setOnboardingCompleted} from '@/utils/storage';
import type {RootStackScreenProps} from '@/types/navigation';
import {SLIDES} from './slides';
import {styles} from './styles';

const Dot = ({index, scrollX}: {index: number; scrollX: Animated.SharedValue<number>}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const position = scrollX.value / screen.width;
    return {
      width: interpolate(position, [index - 1, index, index + 1], [8, 26, 8], Extrapolation.CLAMP),
      opacity: interpolate(position, [index - 1, index, index + 1], [0.35, 1, 0.35], Extrapolation.CLAMP),
      backgroundColor: interpolateColor(
        position,
        [index - 1, index, index + 1],
        [colors.textTertiary, colors.primary, colors.textTertiary],
      ),
    };
  });
  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export const OnboardingScreen = ({navigation}: RootStackScreenProps<'Onboarding'>) => {
  const listRef = useRef<Animated.FlatList<(typeof SLIDES)[number]>>(null);
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === SLIDES.length - 1;

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  const onMomentumEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActiveIndex(Math.round(event.nativeEvent.contentOffset.x / screen.width));
  }, []);

  const completeOnboarding = useCallback(() => {
    setOnboardingCompleted();
    navigation.reset({index: 0, routes: [{name: 'Main'}]});
  }, [navigation]);

  const onNextPress = useCallback(() => {
    if (isLastSlide) {
      completeOnboarding();
      return;
    }
    const nextIndex = activeIndex + 1;
    listRef.current?.scrollToOffset({offset: nextIndex * screen.width, animated: true});
    setActiveIndex(nextIndex);
  }, [activeIndex, isLastSlide, completeOnboarding]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Animated.FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={onMomentumEnd}
        scrollEventThrottle={16}
        renderItem={({item}) => (
          <View style={styles.slide}>
            <View style={styles.illustrationCard}>
              <item.Illustration />
            </View>
            <Text style={styles.title} accessibilityRole="header">
              {item.title}
            </Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((slide, index) => (
            <Dot key={slide.id} index={index} scrollX={scrollX} />
          ))}
        </View>
        <Button
          label={isLastSlide ? 'Get Started' : 'Next'}
          icon={isLastSlide ? 'rocket-launch-outline' : 'arrow-right'}
          onPress={onNextPress}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};
