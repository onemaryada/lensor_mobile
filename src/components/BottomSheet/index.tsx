import React, {memo, type PropsWithChildren} from 'react';
import {Modal, Pressable, View} from 'react-native';
import Animated, {FadeIn, FadeOut, SlideInDown, SlideOutDown} from 'react-native-reanimated';
import {styles} from './styles';

interface BottomSheetProps extends PropsWithChildren {
  visible: boolean;
  onClose: () => void;
}

/** Lightweight animated bottom sheet built on the native Modal. */
const BottomSheetComponent = ({visible, onClose, children}: BottomSheetProps) => (
  <Modal visible={visible} transparent statusBarTranslucent animationType="none" onRequestClose={onClose}>
    <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(160)} style={styles.backdrop}>
      <Pressable style={styles.backdrop} accessibilityLabel="Close sheet" onPress={onClose} />
    </Animated.View>
    <Animated.View
      entering={SlideInDown.springify().damping(19).stiffness(220)}
      exiting={SlideOutDown.duration(200)}
      style={styles.sheet}>
      <View style={styles.handle} />
      {children}
    </Animated.View>
  </Modal>
);

export const BottomSheet = memo(BottomSheetComponent);
