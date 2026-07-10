import React from 'react';
import {DocumentScreen} from '@/components/DocumentScreen';
import type {RootStackScreenProps} from '@/types/navigation';
import {PRIVACY_SECTIONS} from './content';

export const PrivacyPolicyScreen = (_props: RootStackScreenProps<'PrivacyPolicy'>) => (
  <DocumentScreen title="Privacy Policy" updatedAt="July 10, 2026" sections={PRIVACY_SECTIONS} />
);
