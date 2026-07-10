import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, radius, shadows, spacing, typography} from '@/theme';

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string;
  type: ToastType;
  id: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const TOAST_DURATION_MS = 2600;

const ICONS: Record<ToastType, string> = {
  success: 'check-circle',
  error: 'alert-circle',
  info: 'information',
};

const TINTS: Record<ToastType, string> = {
  success: colors.success,
  error: colors.error,
  info: colors.primary,
};

export const ToastProvider = ({children}: PropsWithChildren) => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insets = useSafeAreaInsets();

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setToast({message, type, id: Date.now()});
    timeoutRef.current = setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }, []);

  const value = useMemo(() => ({showToast}), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <View
          key={toast.id}
          style={[styles.container, {bottom: insets.bottom + spacing.xl + spacing.lg}]}
          pointerEvents="none">
          <View style={styles.toast}>
            <Icon name={ICONS[toast.type]} size={22} color={TINTS[toast.type]} />
            <Text style={styles.message} numberOfLines={2}>
              {toast.message}
            </Text>
          </View>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside a ToastProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.editorSurface,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderRadius: radius.button,
    maxWidth: 420,
    ...shadows.medium,
  },
  message: {
    ...typography.subtitle,
    color: colors.editorText,
    flexShrink: 1,
  },
});
