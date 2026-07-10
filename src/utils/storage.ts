import {createMMKV} from 'react-native-mmkv';
import {STORAGE_KEYS} from '@/constants/app';

export const storage = createMMKV({id: 'lensor-storage'});

export const isOnboardingCompleted = (): boolean =>
  storage.getBoolean(STORAGE_KEYS.onboardingCompleted) ?? false;

export const setOnboardingCompleted = (): void => {
  storage.set(STORAGE_KEYS.onboardingCompleted, true);
};

export const hasCustomSavePermission = (): boolean =>
  storage.getBoolean('custom_save_permission') ?? false;

export const setCustomSavePermission = (val: boolean): void => {
  storage.set('custom_save_permission', val);
};
