import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius, shadows } from '../constants/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'action';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  loading = false,
  style,
}) => {
  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? colors.primaryGold : colors.white} />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={variant === 'secondary' ? colors.primaryGold : colors.white}
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.text,
              variant === 'secondary' && styles.secondaryText,
              variant === 'action' && styles.actionText,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[styles.container, disabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'action') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[styles.actionButton, disabled && styles.disabled, style]}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  // Secondary variant
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[styles.secondaryButton, disabled && styles.disabled, style]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
    ...shadows.button,
  },
  gradient: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  secondaryButton: {
    height: 56,
    borderRadius: borderRadius.xxl,
    borderWidth: 2,
    borderColor: colors.primaryGold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    backgroundColor: 'transparent',
  },
  actionButton: {
    height: 48,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.cardButton,
  },
  text: {
    color: colors.white,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.bold, // Use Outfit Bold
    textAlign: 'center',
  },
  secondaryText: {
    color: colors.primaryGold,
  },
  actionText: {
    fontSize: typography.fontSize.sm,
  },
  icon: {
    marginRight: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
});
