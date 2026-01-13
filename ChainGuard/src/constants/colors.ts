// Mular Color Palette
export const colors = {
  // Primary Colors
  primaryGold: '#D4A574',
  darkGold: '#B8935F',
  
  // Background Colors
  deepNavy: '#1A2332',
  charcoal: '#2C3E50',
  darkGreen: '#1B4332',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  cardButton: '#243656',
  
  // Border & Divider Colors
  borderGray: '#E0E0E0',
  
  // Text Colors
  textDark: '#1F1F1F',
  textGray: '#6B7280',
  textLight: '#9CA3AF',
  
  // Status Colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // Transparent overlays
  overlay: 'rgba(0, 0, 0, 0.5)',
  glassOverlay: 'rgba(255, 255, 255, 0.1)',
};

// Gradient configurations
export const gradients = {
  primary: [colors.primaryGold, colors.darkGold] as const,
  background: [colors.charcoal, colors.deepNavy] as const,
  darkGreen: ['#1B4332', '#0D2818'] as const,
  card: ['#344F80', '#2A3F66'] as const,
};
