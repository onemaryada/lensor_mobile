import React, {memo} from 'react';
import {Modal, Text, View, StyleSheet, Pressable} from 'react-native';
import {colors, radius, spacing, typography} from '@/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PermissionModalProps {
  visible: boolean;
  onAllow: () => void;
  onDeny: () => void;
}

const PermissionModalComponent = ({visible, onAllow, onDeny}: PermissionModalProps) => (
  <Modal visible={visible} transparent statusBarTranslucent animationType="fade" onRequestClose={onDeny}>
    <View style={styles.backdrop}>
      <Pressable style={StyleSheet.absoluteFillObject} accessibilityLabel="Close" onPress={onDeny} />
      <View style={styles.dialog}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Icon name="image-multiple" size={28} color={colors.primary} />
          </View>
          <Text style={styles.title}>Storage Permission</Text>
          <Text style={styles.description}>
            Allow Lensor to save images directly to your device's photo gallery?
          </Text>
        </View>
        <View style={styles.buttons}>
          <Pressable
            style={({pressed}) => [styles.button, styles.denyButton, pressed && styles.buttonPressed]}
            onPress={onDeny}>
            <Text style={styles.denyText}>Don't Allow</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [styles.button, styles.allowButton, pressed && styles.buttonPressed]}
            onPress={onAllow}>
            <Text style={styles.allowText}>Allow</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  dialog: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    width: '100%',
    maxWidth: 310,
    overflow: 'hidden',
  },
  content: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  button: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: colors.background,
  },
  denyButton: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  allowButton: {},
  denyText: {
    ...typography.button,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  allowText: {
    ...typography.button,
    color: colors.primary,
    fontWeight: '600',
  },
});

export const PermissionModal = memo(PermissionModalComponent);
