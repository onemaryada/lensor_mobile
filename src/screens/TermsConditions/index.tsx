import React from 'react';
import {DocumentScreen} from '@/components/DocumentScreen';
import type {RootStackScreenProps} from '@/types/navigation';
import {TERMS_SECTIONS} from './content';

export const TermsConditionsScreen = (_props: RootStackScreenProps<'TermsConditions'>) => (
  <DocumentScreen title="Terms & Conditions" updatedAt="July 10, 2026" sections={TERMS_SECTIONS} />
);
