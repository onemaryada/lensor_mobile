import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppHeader} from '@/components/AppHeader';
import {APP_INFO, OPEN_SOURCE_LIBRARIES} from '@/constants/app';
import type {RootStackScreenProps} from '@/types/navigation';
import {styles} from './styles';

const DETAILS = [
  {label: 'App Name', value: APP_INFO.name},
  {label: 'Version', value: APP_INFO.version},
  {label: 'Platform', value: APP_INFO.platform},
  {label: 'React Native', value: APP_INFO.reactNativeVersion},
  {label: 'License', value: APP_INFO.license},
] as const;

export const AppInfoScreen = (_props: RootStackScreenProps<'AppInfo'>) => (
  <SafeAreaView style={styles.container} edges={['top']}>
    <AppHeader title="App Info" />
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.logoBadge}>
          <Image source={require('@/assets/images/lesnar_logo.jpg')} style={styles.logoImage} />
        </View>
        <Text style={styles.appName}>{APP_INFO.name}</Text>
        <Text style={styles.appTagline}>Edit. Enhance. Share.</Text>
      </View>

      <View style={styles.card}>
        {DETAILS.map((detail, index) => (
          <View key={detail.label}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>{detail.label}</Text>
              <Text style={styles.rowValue}>{detail.value}</Text>
            </View>
            {index < DETAILS.length - 1 ? <View style={styles.separator} /> : null}
          </View>
        ))}
      </View>

      {/* <View>
        <Text style={styles.librariesTitle}>Open Source Libraries</Text>
        <View style={styles.chipsWrap}>
          {OPEN_SOURCE_LIBRARIES.map(library => (
            <View key={library} style={styles.chip}>
              <Text style={styles.chipText}>{library}</Text>
            </View>
          ))}
        </View>
      </View> */}
    </ScrollView>
  </SafeAreaView>
);
