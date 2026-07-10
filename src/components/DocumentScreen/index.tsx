import React, {memo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppHeader} from '@/components/AppHeader';
import {styles} from './styles';

export interface DocumentSection {
  title: string;
  body: string;
}

interface DocumentScreenProps {
  title: string;
  updatedAt: string;
  sections: DocumentSection[];
}

/** Shared scrollable card layout for legal / informational documents. */
const DocumentScreenComponent = ({title, updatedAt, sections}: DocumentScreenProps) => (
  <SafeAreaView style={styles.container} edges={['top']}>
    <AppHeader title={title} />
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.updatedAt}>Last updated: {updatedAt}</Text>
      {sections.map((section, index) => (
        <Animated.View
          key={section.title}
          entering={FadeInUp.delay(60 * index).duration(320)}
          style={styles.card}>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            {section.title}
          </Text>
          <Text style={styles.sectionBody}>{section.body}</Text>
        </Animated.View>
      ))}
      <View />
    </ScrollView>
  </SafeAreaView>
);

export const DocumentScreen = memo(DocumentScreenComponent);
