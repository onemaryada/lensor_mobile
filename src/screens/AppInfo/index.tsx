import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppHeader} from '@/components/AppHeader';
import {APP_INFO, OPEN_SOURCE_LIBRARIES} from '@/constants/app';
import {colors} from '@/theme';
import type {RootStackScreenProps} from '@/types/navigation';
import {styles} from './styles';

const DETAILS = [
  {label: 'App Name', value: APP_INFO.name},
  {label: 'Version', value: APP_INFO.version},
  {label: 'Developer', value: APP_INFO.developer},
  {label: 'Platform', value: APP_INFO.platform},
  {label: 'React Native', value: APP_INFO.reactNativeVersion},
  {label: 'License', value: APP_INFO.license},
] as const;

const GRADIENT = [colors.primary, colors.accent];

export const AppInfoScreen = (_props: RootStackScreenProps<'AppInfo'>) => (
  <SafeAreaView style={styles.container} edges={['top']}>
    <AppHeader title="App Info" />
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.logoBadge}>
          <LinearGradient colors={GRADIENT} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.logoGradient} />
          <Icon name="camera-iris" size={44} color={colors.white} />
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

      <View>
        <Text style={styles.librariesTitle}>Open Source Libraries</Text>
        <View style={styles.chipsWrap}>
          {OPEN_SOURCE_LIBRARIES.map(library => (
            <View key={library} style={styles.chip}>
              <Text style={styles.chipText}>{library}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
