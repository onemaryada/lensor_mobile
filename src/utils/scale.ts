import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const GUIDELINE_WIDTH = 375;
const GUIDELINE_HEIGHT = 812;

export const scale = (size: number): number => (SCREEN_WIDTH / GUIDELINE_WIDTH) * size;

export const verticalScale = (size: number): number => (SCREEN_HEIGHT / GUIDELINE_HEIGHT) * size;

export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

export const screen = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} as const;
