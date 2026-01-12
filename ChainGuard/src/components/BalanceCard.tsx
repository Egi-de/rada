import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from './CustomButton';
import { colors, gradients } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';

interface BalanceCardProps {
  balance: number;
  currency: 'USD' | 'NGN';
  onCurrencyToggle: () => void;
  onSwap: () => void;
  onSend: () => void;
  userAvatar?: string;
  onNotificationPress: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  currency,
  onCurrencyToggle,
  onSwap,
  onSend,
  userAvatar,
  onNotificationPress,
}) => {
  const formatBalance = (amount: number) => {
    return currency === 'USD' 
      ? `$${amount.toFixed(2)}`
      : `₦${amount.toFixed(2)}`;
  };

  return (
    <LinearGradient
      colors={gradients.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatar}>
          {userAvatar ? (
            <Image source={{ uri: userAvatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={24} color={colors.white} />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.currencyToggle}>
          <TouchableOpacity
            style={[styles.currencyButton, currency === 'USD' && styles.currencyButtonActive]}
            onPress={onCurrencyToggle}
          >
            <Text style={[styles.currencyText, currency === 'USD' && styles.currencyTextActive]}>
              USD
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.currencyButton, currency === 'NGN' && styles.currencyButtonActive]}
            onPress={onCurrencyToggle}
          >
            <Text style={[styles.currencyText, currency === 'NGN' && styles.currencyTextActive]}>
              NGN
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onNotificationPress} style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Total Transfer */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Total Transfer</Text>

        <Text style={styles.balanceAmount}>
          {formatBalance(balance)}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
       
        <CustomButton
          title="Swap"
          onPress={onSwap}
          variant="action"
          icon="swap-horizontal"
          style={styles.actionButton}
        />
        <CustomButton
          title="Send"
          onPress={onSend}
          variant="action"
          icon="paper-plane-outline"
          style={styles.actionButton}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    marginHorizontal: spacing.base,
    marginTop: spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primaryGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.xl,
    padding: 4,
  },
  currencyButton: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  currencyButtonActive: {
    backgroundColor: colors.primaryGold,
  },
  currencyText: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  currencyTextActive: {
    fontWeight: typography.fontWeight.semibold,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  balanceLabel: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.md,
    opacity: 0.8,
  },
  balanceAmount: {
    color: colors.white,
    fontSize: typography.fontSize.huge,
    fontWeight: typography.fontWeight.bold,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});
