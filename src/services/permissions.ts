import {Platform, Alert} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const isAndroid = Platform.OS === 'android';
const androidVersion = isAndroid ? Number(Platform.Version) : 0;

/**
 * Android 13+ ships a system photo picker that needs no permission.
 * Android 12 and below require READ_EXTERNAL_STORAGE to browse the gallery.
 */
export const ensureGalleryPermission = async (): Promise<boolean> => {
  if (!isAndroid || androidVersion >= 33) {
    return true;
  }
  const permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  const status = await check(permission);
  if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
    return true;
  }
  const result = await request(permission);
  return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
};

export const ensureSavePermission = async (): Promise<boolean> => {
  if (!isAndroid) {
    return true;
  }
  const needsSystemPermission = androidVersion < 29;
  const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

  if (needsSystemPermission) {
    const status = await check(permission);
    if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
      return true;
    }
  }

  return new Promise(resolve => {
    Alert.alert(
      'Storage Permission',
      'Allow Lensor to save images to your device?',
      [
        {
          text: "Don't allow",
          style: 'cancel',
          onPress: () => {
            Alert.alert(
              'Permission Required',
              'Cannot save changes to your device without your permission.',
              [
                {text: 'Cancel', style: 'cancel', onPress: () => resolve(false)},
                {
                  text: 'Allow Permission',
                  onPress: async () => {
                    if (needsSystemPermission) {
                      const res = await request(permission);
                      resolve(res === RESULTS.GRANTED || res === RESULTS.LIMITED);
                    } else {
                      resolve(true);
                    }
                  },
                },
              ],
            );
          },
        },
        {
          text: 'Allow',
          onPress: async () => {
            if (needsSystemPermission) {
              const res = await request(permission);
              resolve(res === RESULTS.GRANTED || res === RESULTS.LIMITED);
            } else {
              resolve(true);
            }
          },
        },
      ],
    );
  });
};
