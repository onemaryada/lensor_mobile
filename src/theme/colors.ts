export const colors = {
  primary: '#4F46E5',
  secondary: '#6366F1',
  accent: '#8B5CF6',
  background: '#F8FAFC',
  card: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
  success: '#10B981',
  error: '#EF4444',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(15, 23, 42, 0.45)',
  glass: 'rgba(255, 255, 255, 0.72)',
  // Editor (dark) palette
  editorBackground: '#0F172A',
  editorSurface: '#1E293B',
  editorBorder: '#334155',
  editorText: '#F1F5F9',
  editorTextMuted: '#94A3B8',
} as const;

export type AppColor = keyof typeof colors;
