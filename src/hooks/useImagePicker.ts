import {useCallback, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {ensureGalleryPermission} from '@/services/permissions';
import type {PickedImage} from '@/types/editor';

interface UseImagePickerResult {
  pickImage: () => Promise<PickedImage | null>;
  isPicking: boolean;
  error: string | null;
}

export const useImagePicker = (): UseImagePickerResult => {
  const [isPicking, setIsPicking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = useCallback(async (): Promise<PickedImage | null> => {
    setError(null);
    setIsPicking(true);
    try {
      const allowed = await ensureGalleryPermission();
      if (!allowed) {
        setError('Gallery permission is required to select a photo.');
        return null;
      }
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 1,
        includeBase64: false,
      });
      if (result.didCancel) {
        return null;
      }
      if (result.errorCode) {
        setError(result.errorMessage ?? 'Could not open the gallery.');
        return null;
      }
      const asset = result.assets?.[0];
      if (!asset?.uri || !asset.width || !asset.height) {
        setError('The selected image could not be read.');
        return null;
      }
      return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        fileName: asset.fileName,
      };
    } finally {
      setIsPicking(false);
    }
  }, []);

  return {pickImage, isPicking, error};
};
