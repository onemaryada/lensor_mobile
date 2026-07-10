import React, {useCallback, useMemo, useState} from 'react';
import {Pressable, Text, View, ActivityIndicator, Alert, type LayoutChangeEvent} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useImage} from '@shopify/react-native-skia';
import {AppHeader} from '@/components/AppHeader';
import {Button} from '@/components/Button';
import {Loader} from '@/components/Loader';
import {useToast} from '@/context/ToastContext';
import {saveBase64Image, SaveError} from '@/services/imageSaver';
import {colors} from '@/theme';
import type {AdjustmentKey, FilterPreset} from '@/types/editor';
import type {RootStackScreenProps} from '@/types/navigation';
import {AdjustPanel} from './AdjustPanel';
import {EditorCanvas} from './EditorCanvas';
import {makeThumbnail, renderExportBase64} from './exportImage';
import {FilterPanel} from './FilterPanel';

import {hasCustomSavePermission, setCustomSavePermission} from '@/utils/storage';
import {styles} from './styles';
import {useEditorState} from './useEditorState';

type PanelMode = 'filters' | 'adjust';

interface ActionItem {
  key: string;
  label: string;
  icon: string;
  onPress: () => void;
  active?: boolean;
  isSave?: boolean;
  disabled?: boolean;
}

export const ImageEditorScreen = ({route}: RootStackScreenProps<'ImageEditor'>) => {
  const {imageUri, imageWidth, imageHeight} = route.params;
  const image = useImage(imageUri);
  const {showToast} = useToast();
  const editor = useEditorState();

  const [panelMode, setPanelMode] = useState<PanelMode>('filters');
  const [isSaving, setIsSaving] = useState(false);
  const [canvasArea, setCanvasArea] = useState({width: 0, height: 0});


  const thumbnail = image;

  const canvasSize = useMemo(() => {
    if (!canvasArea.width || !canvasArea.height || !imageWidth || !imageHeight) {
      return {width: 0, height: 0};
    }
    const scale = Math.min(canvasArea.width / imageWidth, canvasArea.height / imageHeight);
    return {
      width: Math.floor(imageWidth * scale),
      height: Math.floor(imageHeight * scale),
    };
  }, [canvasArea, imageWidth, imageHeight]);

  const onCanvasAreaLayout = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setCanvasArea({width, height});
  }, []);

  const onSelectPreset = useCallback(
    (preset: FilterPreset) => editor.applyPreset(preset),
    [editor],
  );

  const onAdjustmentEnd = useCallback(
    (key: AdjustmentKey, value: number) => editor.setAdjustment(key, value),
    [editor],
  );

  const performSave = useCallback(async () => {
    setIsSaving(true);
    try {
      // Let the saving overlay paint before the (synchronous) Skia export.
      await new Promise(resolve => setTimeout(resolve, 60));
      const base64 = renderExportBase64(image, editor.adjustments);
      await saveBase64Image(base64);
      showToast('Image Saved Successfully', 'success');
    } catch (error) {
      if (error instanceof SaveError && error.reason === 'permission') {
        showToast('Storage permission is required to save images.', 'error');
      } else {
        const msg = error instanceof Error ? error.message : String(error);
        showToast(`Error: ${msg}`, 'error');
      }
    } finally {
      setIsSaving(false);
    }
  }, [image, editor.adjustments, showToast]);

  const onSave = useCallback(() => {
    if (!image || isSaving) {
      return;
    }
    if (hasCustomSavePermission()) {
      performSave();
    } else {
      Alert.alert(
        'Storage Permission',
        "Allow Lesnar to save images directly to your device's photo gallery?",
        [
          {text: "Don't Allow", style: 'cancel', onPress: () => {
            showToast('Cannot save changes to your device without permission.', 'error');
          }},
          {text: 'Allow', onPress: () => {
            setCustomSavePermission(true);
            performSave();
          }},
        ]
      );
    }
  }, [image, isSaving, performSave, showToast]);

  const actions: ActionItem[] = [
    {
      key: 'reset',
      label: 'Reset',
      icon: 'restore',
      onPress: editor.reset,
      disabled: !editor.isDirty,
    },
    {
      key: 'filters',
      label: 'Filters',
      icon: 'auto-fix',
      onPress: () => setPanelMode('filters'),
      active: panelMode === 'filters',
    },
    {
      key: 'adjust',
      label: 'Adjust',
      icon: 'tune-variant',
      onPress: () => setPanelMode('adjust'),
      active: panelMode === 'adjust',
    },
  ];

  if (image === null && !imageUri) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <AppHeader title="Edit" dark />
        <View style={styles.centerFill}>
          <Icon name="image-off-outline" size={48} color={colors.editorTextMuted} />
          <Text style={styles.errorText}>No image selected. Go back and choose a photo.</Text>
          <Button label="Go Back" variant="secondary" onPress={() => {}} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <AppHeader
        title="Edit"
        dark
        rightIcon="download"
        isRightLoading={isSaving}
        onRightPress={onSave}
      />
      <View style={styles.canvasArea} onLayout={onCanvasAreaLayout}>
        {image && canvasSize.width > 0 ? (
          <EditorCanvas
            image={image}
            adjustmentsSV={editor.adjustmentsSV}
            canvasWidth={canvasSize.width}
            canvasHeight={canvasSize.height}
          />
        ) : (
          <Loader />
        )}
      </View>

      <View style={styles.panelArea}>
        {panelMode === 'filters' ? (
          <FilterPanel
            thumbnail={thumbnail}
            selectedPresetId={editor.selectedPresetId}
            onSelect={onSelectPreset}
          />
        ) : (
          <AdjustPanel
            adjustments={editor.adjustments}
            adjustmentsSV={editor.adjustmentsSV}
            onChangeEnd={onAdjustmentEnd}
          />
        )}
      </View>

      <View style={styles.actionBar}>
        {actions.map(action => (
          <Pressable
            key={action.key}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            accessibilityState={{selected: !!action.active, disabled: !!action.disabled}}
            disabled={action.disabled}
            onPress={action.onPress}
            style={[styles.actionButton, action.active && styles.actionButtonActive]}>
            {action.isSave && isSaving ? (
              <ActivityIndicator size="small" color={colors.accent} />
            ) : (
              <Icon
                name={action.icon}
                size={22}
                color={
                  action.isSave
                    ? colors.accent
                    : action.active
                      ? colors.editorText
                      : colors.editorTextMuted
                }
              />
            )}
            <Text
              style={[
                styles.actionLabel,
                action.active && styles.actionLabelActive,
                action.isSave && styles.saveLabel,
              ]}>
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>


    </SafeAreaView>
  );
};
