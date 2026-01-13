// Typography constants
import { TextStyle } from 'react-native';

type FontWeight = TextStyle['fontWeight'];

export const typography = {
  // Font Families
  fonts: {
    regular: 'Outfit_400Regular',
    medium: 'Outfit_500Medium',
    semibold: 'Outfit_600SemiBold',
    bold: 'Outfit_700Bold',
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    huge: 32,
    display: 48,
  },
  
  // Font Weights
  fontWeight: {
    regular: '400' as FontWeight,
    medium: '500' as FontWeight,
    semibold: '600' as FontWeight,
    bold: '700' as FontWeight,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};
