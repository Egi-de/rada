import React, { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ value, onChange, onComplete }) => {
  const inputRefs = useRef<TextInput[]>([]);
  const digits = value.split('');

  useEffect(() => {
    if (value.length === 6 && onComplete) {
      onComplete(value);
    }
  }, [value, onComplete]);

  const handleChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return;

    const newDigits = [...digits];
    
    if (text) {
      // Handle paste
      if (text.length > 1) {
        const pastedDigits = text.slice(0, 6).split('');
        pastedDigits.forEach((digit, i) => {
          if (index + i < 6) {
            newDigits[index + i] = digit;
          }
        });
        onChange(newDigits.join(''));
        
        // Focus on next empty box or last box
        const nextIndex = Math.min(index + pastedDigits.length, 5);
        inputRefs.current[nextIndex]?.focus();
      } else {
        // Single digit input
        newDigits[index] = text;
        onChange(newDigits.join(''));
        
        // Auto-focus next input
        if (index < 5) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    } else {
      // Handle backspace
      newDigits[index] = '';
      onChange(newDigits.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
          style={[
            styles.input,
            digits[index] && styles.inputFilled,
          ]}
          value={digits[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
  },
  input: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
    color: colors.textDark,
    backgroundColor: colors.white,
  },
  inputFilled: {
    borderWidth: 2,
    borderColor: colors.primaryGold,
  },
});
