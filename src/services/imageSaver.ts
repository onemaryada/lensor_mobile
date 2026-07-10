import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import * as RNFS from '@dr.pogodin/react-native-fs';
import {SAVE_ALBUM_NAME} from '@/constants/app';
import {buildExportFileName} from '@/utils/date';
import {ensureSavePermission} from './permissions';

export class SaveError extends Error {
  constructor(message: string, readonly reason: 'permission' | 'io') {
    super(message);
    this.name = 'SaveError';
  }
}

/**
 * Persists a base64-encoded JPEG into the device gallery under the
 * Pictures/Lesnar album. Returns the saved asset URI.
 */
export const saveBase64Image = async (base64: string): Promise<string> => {
  const tempPath = `${RNFS.CachesDirectoryPath}/${buildExportFileName()}`;
  try {
    await RNFS.writeFile(tempPath, base64, 'base64');
    const savedUri = await CameraRoll.saveAsset(`file://${tempPath}`, {
      type: 'photo',
    });
    return typeof savedUri === 'string' ? savedUri : savedUri.node.image.uri;
  } catch (error) {
    if (error instanceof SaveError) {
      throw error;
    }
    throw new SaveError(error instanceof Error ? error.message : 'Failed to save image', 'io');
  } finally {
    RNFS.unlink(tempPath).catch(() => {
      // Temp file cleanup is best-effort.
    });
  }
};
