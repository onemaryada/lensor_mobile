# Lesnar ProGuard / R8 rules

# React Native core
-keep class com.facebook.react.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.react.**

# Reanimated / Worklets
-keep class com.swmansion.reanimated.** { *; }
-keep class com.swmansion.worklets.** { *; }

# Gesture Handler
-keep class com.swmansion.gesturehandler.** { *; }

# Skia
-keep class com.shopify.reactnative.skia.** { *; }

# MMKV
-keep class com.tencent.mmkv.** { *; }

# BootSplash
-keep class com.zoontek.rnbootsplash.** { *; }

# SVG
-keep class com.horcrux.svg.** { *; }

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}
