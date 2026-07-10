import type {ComponentType} from 'react';
import {EditIllustration, GalleryIllustration, SaveIllustration} from './illustrations';

export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  Illustration: ComponentType;
}

export const SLIDES: OnboardingSlide[] = [
  {
    id: 'choose',
    title: 'Choose Your Photo',
    description:
      'Select any image from your gallery and begin enhancing it with powerful editing tools.',
    Illustration: GalleryIllustration,
  },
  {
    id: 'edit',
    title: 'Edit Like a Pro',
    description:
      'Resize, zoom, rotate, crop and apply beautiful filters with a smooth editing experience.',
    Illustration: EditIllustration,
  },
  {
    id: 'save',
    title: 'Save & Share',
    description:
      'Export your edited image in high quality directly to your device and share it anywhere.',
    Illustration: SaveIllustration,
  },
];
