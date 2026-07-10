import React from 'react';
import Svg, {Circle, Defs, LinearGradient as SvgGradient, Path, Rect, Stop} from 'react-native-svg';
import {colors} from '@/theme';

const SIZE = 240;

const Gradient = ({id}: {id: string}) => (
  <SvgGradient id={id} x1="0" y1="0" x2="1" y2="1">
    <Stop offset="0" stopColor={colors.primary} />
    <Stop offset="1" stopColor={colors.accent} />
  </SvgGradient>
);

export const GalleryIllustration = () => (
  <Svg width={SIZE} height={SIZE} viewBox="0 0 240 240">
    <Defs>
      <Gradient id="g1" />
    </Defs>
    {/* <Rect x="28" y="44" width="120" height="150" rx="20" fill={colors.border} opacity={0.6} /> */}
    <Rect x="48" y="30" width="130" height="160" rx="20" fill="url(#g1)" />
    <Circle cx="88" cy="76" r="14" fill={colors.white} opacity={0.9} />
    <Path d="M60 158 L100 110 L128 142 L146 122 L178 158 Q178 190 158 190 L80 190 Q60 190 60 170 Z" fill={colors.white} opacity={0.85} />
    <Rect x="150" y="140" width="62" height="62" rx="16" fill={colors.card} stroke={colors.border} strokeWidth="2" />
    <Path d="M162 186 L178 166 L190 180 L196 173 L204 186 Q204 194 196 194 L170 194 Q162 194 162 188 Z" fill={colors.accent} />
    <Circle cx="176" cy="158" r="6" fill={colors.secondary} />
  </Svg>
);

export const EditIllustration = () => (
  <Svg width={SIZE} height={SIZE} viewBox="0 0 240 240">
    <Defs>
      <Gradient id="g2" />
    </Defs>
    <Rect x="40" y="36" width="160" height="128" rx="20" fill="url(#g2)" />
    <Path d="M56 140 L96 96 L124 126 L142 108 L184 148 Q184 164 168 164 L72 164 Q56 164 56 152 Z" fill={colors.white} opacity={0.85} />
    <Circle cx="92" cy="72" r="11" fill={colors.white} opacity={0.9} />
    <Rect x="52" y="184" width="136" height="10" rx="5" fill={colors.border} />
    <Rect x="52" y="184" width="88" height="10" rx="5" fill={colors.secondary} />
    <Circle cx="140" cy="189" r="13" fill={colors.white} stroke={colors.secondary} strokeWidth="4" />
    <Rect x="196" y="180" width="18" height="18" rx="6" fill={colors.accent} opacity={0.8} />
    <Rect x="18" y="70" width="18" height="18" rx="6" fill={colors.secondary} opacity={0.7} />
  </Svg>
);

export const SaveIllustration = () => (
  <Svg width={SIZE} height={SIZE} viewBox="0 0 240 240">
    <Defs>
      <Gradient id="g3" />
    </Defs>
    <Rect x="48" y="32" width="144" height="120" rx="20" fill="url(#g3)" />
    <Path d="M64 130 L102 90 L128 118 L144 102 L176 136 Q176 152 160 152 L80 152 Q64 152 64 140 Z" fill={colors.white} opacity={0.85} />
    <Circle cx="96" cy="66" r="10" fill={colors.white} opacity={0.9} />
    <Circle cx="120" cy="188" r="30" fill={colors.card} stroke={colors.border} strokeWidth="2" />
    <Path d="M120 172 L120 196 M110 188 L120 198 L130 188" stroke={colors.primary} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <Circle cx="192" cy="176" r="12" fill={colors.accent} opacity={0.7} />
    <Circle cx="46" cy="176" r="8" fill={colors.secondary} opacity={0.7} />
  </Svg>
);
