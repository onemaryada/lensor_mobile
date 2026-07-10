# Lesnar

A production-ready, Android-only photo editing app built with **React Native CLI 0.86 + TypeScript**. Pick a photo, fine-tune it with pro-level adjustments and preset filters rendered through **React Native Skia**, then export it in high quality to `Pictures/Lesnar`.

Everything runs **completely offline** — no backend, no analytics, no tracking.

## Features

- Animated splash (React Native Bootsplash + Reanimated fade-in)
- 3-page swipeable onboarding with animated page indicator (shown once, persisted via MMKV)
- Bottom tab navigation (Home / Settings) with type-safe React Navigation v7
- Gallery picker (Android 13+ photo picker, permission-aware on older versions)
- Image editor:
  - Pinch to zoom, drag, twist to rotate, double-tap to reset (Gesture Handler + Reanimated, all on the UI thread)
  - 9 adjustments: Brightness, Contrast, Saturation, Blur, Sharpen, Warmth, Exposure, Vignette, Grayscale — one combined Skia color matrix, blur image filter, and an SkSL unsharp-mask runtime shader
  - 11 preset filters (Original, Vintage, Cool, Warm, Mono, Noir, Retro, Fade, Dream, Bright, HDR) with live Skia thumbnails
  - Sliders write straight to Reanimated shared values → the preview updates at 60fps without touching the JS thread
- High-quality export: the original full-resolution image is re-rendered offscreen through the same filter pipeline (capped at 4096px, JPEG q95) and saved to the `Pictures/Lesnar` album with unique timestamped filenames
- Settings module: Privacy Policy, Terms & Conditions, App Info (incl. open-source libraries), Rate App, Share App
- Success/error snackbar, loading and empty states, accessibility labels throughout

## Getting started

```bash
npm install

# generate bootsplash assets once you have a logo PNG (optional — a vector
# fallback drawable is already committed):
#   npm run bootsplash

npm run android         # debug build on device/emulator
npm run typecheck       # tsc --noEmit
npm run lint
npm run release:android # assembleRelease
```

> Release builds are signed with the debug keystore by default — generate your own keystore before publishing (see the comment in `android/app/build.gradle`).

## Architecture

```
src/
 ├── assets/            images, icons, fonts (fonts auto-linked via react-native.config.js)
 ├── components/        Button, Slider, FilterCard, AppHeader, AppImage, BottomSheet, Loader, DocumentScreen
 ├── navigation/        RootNavigator (native stack) + MainTabs (bottom tabs)
 ├── screens/           Splash, Onboarding, Home, ImageEditor, Settings, PrivacyPolicy, TermsConditions, AppInfo
 ├── hooks/             useImagePicker, usePressScale
 ├── utils/             colorMatrix (filter math), storage (MMKV), scale, date
 ├── services/          permissions, imageSaver (MediaStore via CameraRoll)
 ├── constants/         app info, adjustment configs, filter presets
 ├── theme/             colors, typography, spacing, radii, shadows
 ├── types/             navigation + editor domain types
 ├── context/           ToastContext (snackbar)
 └── App.tsx
```

Conventions: absolute imports via `@/` (babel module-resolver + tsconfig paths), no inline styles (ESLint-enforced), memoized components, strict TypeScript.

### How the filter engine works

1. All adjustment sliders map to a single 4×5 color matrix (`utils/colorMatrix.ts`) composed on the UI thread inside a Reanimated derived value.
2. Blur is a Skia `Blur` image filter with sigma proportional to render width, so preview and export match visually.
3. Sharpen is an SkSL runtime shader (unsharp mask) — a no-op at strength 0 so it can stay mounted.
4. Vignette is a radial-gradient overlay whose opacity is animated.
5. **Export** (`screens/ImageEditor/exportImage.ts`) replays the identical pipeline onto an offscreen Skia surface at the original image resolution — the preview is never screenshotted, so there is no quality loss.

### Library choices (vs. the original wishlist)

- **react-native-image-filter-kit** is unmaintained and incompatible with the New Architecture → replaced by **@shopify/react-native-skia**, which also removed the need for react-native-view-shot and react-native-image-resizer (the offscreen surface handles scaling/encoding).
- **react-native-fs** → **@dr.pogodin/react-native-fs** (actively maintained, New Architecture support).
- **@react-native-camera-roll/camera-roll** added: it is the correct MediaStore path for saving into `Pictures/Lesnar` under scoped storage.
- **react-native-fast-image** is not New-Architecture ready → a lightweight `AppImage` component (loading/error states + fade-in) covers its use here.
- **react-native-blur** skipped: all blurring is done in Skia.
- **Firebase** not integrated — no backend functionality is required for v1, per spec.

## Android configuration

- **New Architecture + Hermes enabled**, minSdk 24, target/compile SDK 36
- Permissions follow Android 13+ guidelines: `READ_MEDIA_IMAGES` (33+), `READ_EXTERNAL_STORAGE` (≤32), `WRITE_EXTERNAL_STORAGE` (≤28 only)
- Network security config blocks all cleartext traffic except local Metro hosts
- ProGuard/R8 enabled for release with rules for RN, Reanimated, Skia, MMKV, Bootsplash, SVG
- Adaptive app icon (vector foreground + brand color background, incl. monochrome layer)
- Bootsplash theme + vector logo committed; regenerate pixel-perfect assets with `npm run bootsplash`
- App locked to portrait
# lesnar_mobile
